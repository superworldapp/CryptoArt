import React, { useRef, useReducer } from 'react';
import Modal from "../Modal";
import {Container, Form, FormGroup, Input, Label} from "reactstrap";
import loader from "../../images/loader.svg";
import './style.scss';

const CHANGE_FILE_VALUE = 'CHANGE_FILE_VALUE';
const CHANGE_NAME_VALUE = 'CHANGE_NAME_VALUE';
const CHANGE_DESCRIPTION_VALUE = 'CHANGE_DESCRIPTION_VALUE';

const initialControls = {
  file: {
    value: '',
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
    default:
      throw new Error();
  }
}

const ModalUploadToMyStore = props => {
  const {
    isOpen,
    toggle,
    onClosed,
  } = props

  const inputFileRef = useRef(null)
  const [controls, controlsDispatch] = useReducer(controlsReducer, initialControls);
  console.log('### controls ->', controls);
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      onClosed={onClosed}
      className='uploadpopup'
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
              <button className='modal-upload-input-file' onClick={(e) => {
                e.preventDefault()
                console.log('### inputFileRef.current ->', inputFileRef.current);
                inputFileRef.current.getRef().click()
              }}>Browse...</button>
            </Label>
            <Input
              id='file-input'
              style={{ display: 'none' }}
              type='file'
              ref={inputFileRef}
              onChange={/*this.fileSelectHandler*/() => {console.log('######################');}}
            />
          </FormGroup>

          <FormGroup>
            <Label
              htmlFor='title'
              className={`uploadlabel ${controls.name.required ? 'control-required' : ''}`}
            >
              Name
            </Label>
            <Input
              type='text'
              id='title'
              name='title'
              value={controls.name.value}
              onChange={/*this.handleInputChange*/(e) => {
                console.log('### controls.name.value ->', controls.name.value);
                controlsDispatch({ type: CHANGE_NAME_VALUE, payload: { value: e.target.value } })
              }}
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
              id='des'
              name='des'
              placeholder='Enter text'
              value={controls.description.value}
              onChange={/*this.handleInputChange*/(e) => {
                console.log('### controls.description.value ->', controls.description.value);
                controlsDispatch({ type: CHANGE_DESCRIPTION_VALUE, payload: { value: e.target.value } })
              }}
            />
          </FormGroup>
          <FormGroup className='form-group-preview'>
            <Label
              htmlFor='title'
              className={`uploadlabel ${controls.description.required ? 'control-required' : ''}`}
            >
              Description
            </Label>
            <div className='control-preview'>
              +
            </div>
          </FormGroup>
          {/*<FormGroup>*/}
          {/*  <Label*/}
          {/*    htmlFor='price'*/}
          {/*    className='uploadlabel'*/}
          {/*  >*/}
          {/*    Token Price*/}
          {/*  </Label>*/}
          {/*  <Input*/}
          {/*    style={{ width: '50%' }}*/}
          {/*    type='text'*/}
          {/*    id='price'*/}
          {/*    name='price'*/}
          {/*    onChange=/!*this.handleInputChange*/}
          {/*  />*/}
          {/*  <Label*/}
          {/*    className='uploadlabel token-price'*/}
          {/*  >*/}
          {/*    ETH*/}
          {/*  </Label>*/}
          {/*</FormGroup>*/}
          {/*<FormGroup>*/}
          {/*  <Label*/}
          {/*    htmlFor='nos'*/}
          {/*    className='uploadlabel'*/}
          {/*  >*/}
          {/*    No. of Tokens*/}
          {/*  </Label>*/}
          {/*  <Input*/}
          {/*    style={{ width: '40%', marginRight: '11rem' }}*/}
          {/*    placeholder='1'*/}
          {/*    type='number'*/}
          {/*    id='nos'*/}
          {/*    name='nos'*/}
          {/*    onChange=/!*this.handleInputChange*/}
          {/*  />*/}
          {/*</FormGroup>*/}
          <div className='submit-button-wrapper'>
            <button
              className='abtn submit-button'
              onClick={/*this.fileUploadHandler*/(e,...pp) => {e.preventDefault()
                console.log('######################');}}
            >
              Confirm
            </button>
          </div>
          {/*{this.state.isLoading ? (*/}
          {/*  <img*/}
          {/*    style={{ display: 'flex', verticalAlign: 'none' }}*/}
          {/*    src={loader}*/}
          {/*  />*/}
          {/*) : (*/}
          {/*  <div></div>*/}
          {/*)}*/}
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
