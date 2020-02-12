// import React, { useState, useEffect, useCallback } from 'react';
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Trans } from '@lingui/macro';
// import { withPreviews, clearPreviews } from './with-previews';
import { clearPreviews } from './with-previews';
import Modal from '../Modal';
import styled from '../../../themes/styled';
import { UploadCloud } from 'react-feather';
// import request from 'superagent';
import { Heading, Button } from 'rebass/styled-components';
import { Actions, Container, Header } from '../Modal/modal';
import { useUploadImageMutation } from '../../../graphql/uploadImage.generated';
import { useUploadIconMutation } from '../../../graphql/uploadIcon.generated';
import { useFormikContext } from 'formik';

interface Props {
  isSubmitting?: boolean;
  onSubmitting?: any;
  contextId: string;
  uploadType: string;
  onImage: any;
  onIcon: any;
  toggleModal?: any;
  modalIsOpen?: boolean;
}

const ImageDropzoneModal: React.FC<Props> = ({
  isSubmitting,
  onSubmitting,
  contextId,
  uploadType,
  onImage,
  onIcon,
  toggleModal,
  modalIsOpen
}) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [files, setFiles] = useState([] as any);
  const [mutateIcon] = useUploadIconMutation();
  const [mutateImage] = useUploadImageMutation();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const thumbs = files.map(file => (
    <Thumb key={file.name}>
      <ThumbInner>
        <Img src={file.preview} />
      </ThumbInner>
    </Thumb>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const handleSelect = props => {
    const variables = { contextId: contextId, upload: files[0] };
    if (uploadType == 'icon') {
      return mutateIcon({ variables }).then(res => {
        onIcon(res.data!.uploadIcon!.url);
        setFieldValue('icon', res.data!.uploadIcon!.url);
        setFieldTouched('icon', true);
      });
    } else {
      return mutateImage({ variables }).then(res => {
        onImage(res.data!.uploadImage!.url);
        setFieldValue('image', res.data!.uploadImage!.url);
        setFieldTouched('image', true);
      });
    }
  };

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   accept: 'image/*',
  //   multiple: false,
  //   onDrop: withPreviews(handleDrop)
  // });
  useEffect(() => () => clearPreviews(files), [files]);

  return (
    <Modal isOpen={modalIsOpen} toggleModal={toggleModal}>
      <Container>
        <Header>
          <Heading m={2}>
            <Trans>Select Image</Trans>
          </Heading>
        </Header>
        <ThumbsContainer>{thumbs}</ThumbsContainer>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <InfoContainer>
            <UploadCloud width={45} height={45} strokeWidth={2} />
            {isDragActive ? (
              <Info>
                <Trans>Drop the file here ...</Trans>
              </Info>
            ) : (
              <Info>
                <Trans>
                  Drag 'n' drop a file here, or click to select file
                </Trans>
              </Info>
            )}
          </InfoContainer>
        </div>
        <Actions>
          <Button
            disabled={isSubmitting || files.length == 0 ? true : false}
            type="submit"
            style={{ marginLeft: '10px' }}
            onClick={props => {
              toggleModal(false);
              handleSelect(props);
              setFiles([]);
            }}
          >
            <Trans>OK</Trans>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              toggleModal(false);
              clearPreviews(files);
              setFiles([]);
            }}
          >
            <Trans>Cancel</Trans>
          </Button>
        </Actions>
      </Container>
    </Modal>
  );
};

export default ImageDropzoneModal;

const InfoContainer = styled.div`
  background: ${props => props.theme.colors.lighter};
  border-radius: 2px;
  text-align: center;
  padding: 10px 20px;
  font-style: italic;
  cursor: pointer;
  border: 2px dashed ${props => props.theme.colors.gray};
  margin: 0px 20px;
`;

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2;
  // border: 1px solid #eaeaea;
  margin: 8px auto;
  width: 100%;
  max-width: 300px;
  height: auto;
  padding: 4;
  box-sizing: border-box;
`;

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

const Img = styled.img`
  display: block;
  width: 100%;
  height: auto;
  margin: auto;
  text-align: center;
`;

const Info = styled.p`
  margin-top: 0px;
  margin-bottom: 5px;
`;

// const ClearButton = styled.button`
//   width: 100px;
//   cursor: pointer;
//   border: 1px solid ${props => props.theme.colors.gray};
//   margin-left: 20px;
//   padding: 10px;
//   border-radius: 2px;
// `;
