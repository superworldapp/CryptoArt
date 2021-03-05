// @ts-nocheck

import { CompositeLayer } from '@deck.gl/core';
import { IconLayer } from '@deck.gl/layers';
import Supercluster from 'supercluster';

//Will return the correct cluster icon number
//Returns the corresponding cluster icon
function getIconName(size: number) {
    if (size === 0) {
        return '';
    }
    if (size < 10) {
        return `marker-${size}`;
    }
    if (size < 100) {
        return `marker-${Math.floor(size / 10)}0`;
    }
    return 'marker-100';
}

// Calculates and returns the size within the cluster
function getIconSize(size: number) {
    return Math.min(100, size) / 100 + 1;
}

interface IShouldUpdateStateProps {
    changeFlags: {
        dataChanged: string;
        extensionsChanged: boolean;
        propsChanged: string;
        propsOrDataChanged: string;
        somethingChanged: string;
        stateChanged: boolean;
        updateTriggersChanged: boolean;
        viewportChanged: boolean;
    };
}

//https://deck.gl/docs/api-reference/core/composite-layer
export default class IconClusterLayer extends CompositeLayer {
    shouldUpdateState({ changeFlags }: IShouldUpdateStateProps) {
        return changeFlags.somethingChanged;
    }

    updateState({ props, oldProps, changeFlags }: { props: any; oldProps: any; changeFlags: any }) {
        const rebuildIndex = changeFlags.dataChanged || props.sizeScale !== oldProps.sizeScale;

        if (rebuildIndex) {
            const index = new Supercluster({ maxZoom: 16, radius: props.sizeScale });
            index.load(
                props.data.map((d: any) => ({
                    geometry: { coordinates: props.getPosition(d) },
                    properties: d,
                })),
            );
            this.setState({ index });
        }

        const z = Math.floor(this.context.viewport.zoom);
        if (rebuildIndex || z !== this.state.z) {
            this.setState({
                data: this.state.index.getClusters([-180, -85, 180, 85], z),
                z,
            });
        }
    }

    getPickingInfo({ info, mode }: { info: any; mode: any }) {
        const pickedObject = info.object && info.object.properties;
        if (pickedObject) {
            if (pickedObject.cluster && mode !== 'hover') {
                info.objects = this.state.index.getLeaves(pickedObject.cluster_id, 25).map((f: any) => f.properties);
            }
            info.object = pickedObject;
        }
        return info;
    }

    renderLayers() {
        const { data } = this.state;
        const { iconAtlas, iconMapping, sizeScale } = this.props;

        return new IconLayer(
            this.getSubLayerProps({
                id: 'icon',
                data,
                iconAtlas,
                iconMapping,
                sizeScale,
                getPosition: (d: any) => d.geometry.coordinates,
                getIcon: (d: any) => getIconName(d.properties.cluster ? d.properties.point_count : 1),
                getSize: (d: any) => getIconSize(d.properties.cluster ? d.properties.point_count : 1),
            }),
        );
    }
}