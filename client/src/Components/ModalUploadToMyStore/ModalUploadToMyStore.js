import React, {useRef, useEffect, useState, useReducer, useCallback} from 'react';
import Modal from "../Modal";
import {CardImg, Form, FormGroup, Input, Label} from "reactstrap";
import loader from "../../images/loader.svg";
import './style.scss';
import Sound from "react-sound";
import ReactPlayer from "react-player";

const CHANGE_FILE_VALUE = 'CHANGE_FILE_VALUE';
const CHANGE_NAME_VALUE = 'CHANGE_NAME_VALUE';
const CHANGE_DESCRIPTION_VALUE = 'CHANGE_DESCRIPTION_VALUE';
const RESET_VALUE = 'RESET_VALUE';
const CHANGE_FILE_THUMB_VALUE = 'CHANGE_FILE_THUMB_VALUE';

const initialControls = {
  file: {
    value: null,
    url: null,
    required: true,
    isValid: false,
  },
  fileThumb: {
    value: null,
    url: null,
    required: true,
    isValid: false,
  },
  name: {
    value: '',
    required: true,
    isValid: false,
  },
  description: {
    value: '',
    required: false,
    isValid: false,
  },
}

function controlsReducer(state, action) {
  switch (action.type) {
    case CHANGE_FILE_VALUE:
      return {
        ...state,
        file: {
          ...state.file,
          url: action.payload.url,
          value: action.payload.value,
        }
      };
    case CHANGE_FILE_THUMB_VALUE:
      return {
        ...state,
        fileThumb: {
          ...state.fileThumb,
          url: action.payload.url,
          value: action.payload.value,
        }
      };
    case CHANGE_NAME_VALUE:
      return {
        ...state,
        name: {
          ...state.name,
          value: action.payload.value,
        }
      };
    case CHANGE_DESCRIPTION_VALUE:
      return {
        ...state,
        description: {
          ...state.description,
          value: action.payload.value,
        }
      };
    case RESET_VALUE:
      return {
        ...state,
        name: {
          ...state.name,
          value: '',
        },
        description: {
          ...state.description,
          value: '',
        },
        file: {
          ...state.file,
          value: '',
          url: '',
        },
        fileThumb: {
          ...state.fileThumb,
          value: '',
          url: '',
        }
      }
    default:
      throw new Error();
  }
}

const ModalUploadToMyStore = props => {
  const {
    isOpen,
    toggle,
    onClosed,
    onConfirm,
  } = props

  const inputFileRef = useRef(null)
  const [controls, controlsDispatch] = useReducer(controlsReducer, initialControls);
  const [isValidForm, setIsValidForm] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState('');

  useEffect(()=>{
    controlsDispatch({type: RESET_VALUE})
  }, [isOpen])

  const onInputChange = useCallback(e => {
    const { name, value } = e.target

    if (name === 'file') {
      const file = e.target.files[0]

      if (file) {
        controlsDispatch({
          type: CHANGE_FILE_VALUE,
          payload: {
            value: file,
            url: URL.createObjectURL(file),
          }
        })
      }
    } else if (name === 'fileThumb') {
      const file = e.target.files[0]

      controlsDispatch({
        type: CHANGE_FILE_THUMB_VALUE,
        payload: {
          value: file,
          url: URL.createObjectURL(file),
        }
      })
    } else if (name === 'title') {
      controlsDispatch({
        type: CHANGE_NAME_VALUE,
        payload: { value },
      })
    } else if (name === 'desc') {
      controlsDispatch({
        type: CHANGE_DESCRIPTION_VALUE,
        payload: { value },
      })
    }
  }, [])

  const onInputFileClick = useCallback(() => {
    inputFileRef.current && inputFileRef.current.click()
  }, [inputFileRef.current])

  const onConfirmClick = useCallback(e => {
    onClosed()
    onConfirm(e, controls)
  }, [controls])

  useEffect(() => {
    setIsValidForm(controls.name.value && controls.file.value)
  }, [controls])

  const displayFileType = () => {
    if (/\.(jpe?g|png|gif|bmp|svg)$/i.test(controls.fileThumb.value.name)) {
      return (
        <img
          className='control-preview-img'
          src={controls.fileThumb.url}
          alt={controls.fileThumb.value.name}
        />
      );
    } else if (/\.(?:wav|mp3)$/i.test(controls.fileThumb.value.name)) {
      return (
        <>
          <button
            style={{
              zIndex: '1'
            }}
            onClick={() => setSoundPlaying(soundPlaying)}>
            {soundPlaying ? 'Pause' : 'Play'}
          </button>
          <Sound
            url={controls.fileThumb.url}
            playStatus={
              soundPlaying
                ? Sound.status.PLAYING
                : ''
            }
            playFromPosition={300 /* in milliseconds */}
            // onLoading={this.handleSongLoading}
            // onPlaying={this.handleSongPlaying}
            // onFinishedPlaying={this.handleSongFinishedPlaying}
          />
        </>
      );
    } else if (
      /\.(?:mov|avi|wmv|flv|3pg|mp4|mpg)$/i.test(
        controls.fileThumb.value.name
      )
    ) {
      return (
        <ReactPlayer
          className="video-card"
          loop={true}
          playing={true}
          url={controls.fileThumb.url}
        />
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      onClosed={onClosed}
      className='uploadpopup'
      unmountOnClose
      header={(
        <>
          <div className='title'>
            Upload New Item
          </div>
          <div className='subtitle'>
            Image, Video, Audio or 3D Model
          </div>
        </>
      )}
      body={(
        <Form>
          <FormGroup>
            <Label
              htmlFor='artHash'
              className={`uploadlabel ${controls.file.required ? 'control-required' : ''}`}
            >
              File to Upload
            </Label>
            <Label>
              <button className='modal-upload-input-file' onClick={onInputFileClick}>Browse...</button>
            </Label>
            <Input
              id='file-input'
              style={{ opacity: '0', position: 'absolute' }}
              type='file'
              name='file'
              innerRef={inputFileRef}
              onChange={onInputChange}
            />
            <p
              style={{
                fontSize: '15px',
                lineHeight: '15px',
                color: '#888888',
                maxWidth: '130px',
                width: '100%',
                display: 'block',
                marginLeft: '20px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >{controls.file.value && controls.file.value.name}</p>
          </FormGroup>
          <FormGroup>
            <Label
              htmlFor='artHash'
              className="uploadlabel"
            >
              Thumbnail
            </Label>
            <Label>
              <button className='modal-upload-input-file' onClick={onInputFileClick}>Browse...</button>
            </Label>
            <Input
              id='thumbnail'
              style={{ opacity: '0', position: 'absolute' }}
              type='file'
              name='fileThumb'
              innerRef={inputFileRef}
              onChange={onInputChange}
            />
            <p
              style={{
                fontSize: '15px',
                lineHeight: '15px',
                color: '#888888',
                maxWidth: '130px',
                width: '100%',
                display: 'block',
                marginLeft: '20px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >{controls.fileThumb.value && controls.fileThumb.value.name}</p>
          </FormGroup>
          <FormGroup className='form-group-preview'>
            {!controls.fileThumb.url
              ? null
              : displayFileType()
            }
          </FormGroup>
          <FormGroup>
            <Label
              htmlFor='title'
              className={`uploadlabel ${controls.name.required ? 'control-required' : ''}`}
            >
              Name
            </Label>
            <Input
              className="input-name"
              type='text'
              id='title'
              name='title'
              value={controls.name.value}
              onChange={onInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label
              htmlFor='title'
              className={`uploadlabel ${controls.description.required ? 'control-required' : ''}`}
            >
              Description
            </Label>
            <Input
              className='control-description'
              type='textarea'
              id='desc'
              name='desc'
              placeholder='Enter text'
              value={controls.description.value}
              onChange={onInputChange}
            />
          </FormGroup>
          <div className='submit-button-wrapper'>
            <button
              className='abtn submit-button'
              onClick={onConfirmClick}
              disabled={!isValidForm}
            >
              Confirm
            </button>
          </div>
          {/*{batch && batch.length > 0 ? (*/}
          {/*  <img*/}
          {/*    style={{ display: 'flex', verticalAlign: 'none' }}*/}
          {/*    src={loader}*/}
          {/*  />*/}
          {/*) : null }*/}
          {/*{this.state.loadingError ? (*/}
          {/*  <div style={{ color: 'red', fontFamily: 'Gibson' }}>*/}
          {/*    There was a transaction/processing error. Please try again.*/}
          {/*  </div>*/}
          {/*) : (*/}
          {/*  <div></div>*/}
          {/*)}*/}
        </Form>
      )}
    />
  );
};

export default ModalUploadToMyStore;
