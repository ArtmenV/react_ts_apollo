import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Trans } from '@lingui/macro';
import styled from '../../../themes/styled';
import { UploadCloud } from 'react-feather';
import { accepted_file_types } from '../../../constants';

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

interface Props {
  initialUrl: any;
  uploadType?: string;
  formikForm?: any;
  touchedField?: string;
}

const DropzoneArea: React.FC<Props> = ({
  initialUrl,
  uploadType,
  formikForm,
  touchedField
}) => {
  // const { setFieldValue, setFieldTouched } = useFormikContext();
  const [files, setFiles] = useState([] as any);
  const [fileUrl, onFile] = useState(initialUrl);

  const acceptedTypes =
    uploadType != 'resource' ? 'image/*' : accepted_file_types;

  useEffect(
    () => {
      return () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
      };
    },
    [files]
  );

  useEffect(
    () => {
      return () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
      };
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptedTypes,
    onDrop: acceptedFiles => {
      const uploadField = touchedField ? touchedField : 'files';
      formikForm.setFieldValue(uploadField, acceptedFiles);
      formikForm.setFieldTouched(uploadField, true);
      setFiles(acceptedFiles);
      acceptedFiles.map(file => onFile(URL.createObjectURL(file)));
    }
  });

  return (
    <>
      <div {...getRootProps({ className: 'dropzone' })}>
        {uploadType != 'resource' ? (
          <ThumbsContainer>
            <Thumb key={fileUrl}>
              <ThumbInner>
                <Img src={fileUrl} />
              </ThumbInner>
            </Thumb>
          </ThumbsContainer>
        ) : null}
        {uploadType == 'resource' && files.length != 0 ? (
          <FileName>{files[0].name}</FileName>
        ) : null}

        <input {...getInputProps()} />
        <InfoContainer>
          <UploadCloud width={45} height={45} strokeWidth={2} />
          {isDragActive ? (
            <Info>
              <Trans>Drop the file here ...</Trans>
            </Info>
          ) : (
            <Info>
              <Trans>Drag 'n' drop a file here, or click to select file</Trans>
            </Info>
          )}
        </InfoContainer>
      </div>
    </>
  );
};

export default DropzoneArea;

const InfoContainer = styled.div`
  background: ${props => props.theme.colors.lighter};
  border-radius: 2px;
  text-align: center;
  padding: 10px 20px;
  font-style: italic;
  cursor: pointer;
  border: 2px dashed ${props => props.theme.colors.gray};
  margin: 0px;
`;

const FileName = styled.p`
  margin-bottom: 10px;
  font-weight: bold;
  text-align: right;
  font-style: italic;
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
