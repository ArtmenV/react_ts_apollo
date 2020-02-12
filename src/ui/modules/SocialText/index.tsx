import React, { useRef, useState, useCallback } from 'react';
// import { dropEmoji } from '../../lib/emoji';
// import EmojiPicker from 'emoji-picker-react';
// import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';
import { Textarea } from '@rebass/forms';
import { Box, Flex } from 'rebass/styled-components';
import { Send } from 'react-feather';
// const PickerWrap = styled.div`
//   position: absolute;
//   right: 10px;
//   top: 45px;
//   z-index: 999999999999999999;
// `;
const Wrapper = styled(Box)`
  width: 100%;
  position: relative;
  border: 1px solid ${props => props.theme.colors.lightgray};
  border-radius: 4px;
`;
const SocialTextDiv = styled(Flex)`
  position: relative;
  width: 100%;
  align-items: center;
`;
// const EmojiPickerTrigger = styled(Box)`
//   cursor: pointer;
//   &:hover {
//     svg {
//       stroke: ${props => props.theme.colors.orange}
//     }
//   }
// `;

const SocialTextArea = styled(Textarea)`
  height: 60px;
  border-radius: 4px;
  border: 0px solid ${props => props.theme.colors.lightgray} !important;
  resize: none;
  flex: 1;
  font-size: 16px !important;
  &:focus {
    outline: none;
  }
  font-family: 'Open Sans', sans-serif !important;
`;

const SocialActions = styled(Flex)`
  // width: 70px;
`;

export interface Props {
  submit(text: string): void;
  defaultValue?: string;
  clearOnSubmit?: boolean;
  placeholder?: string;
}
export const SocialText: React.FC<Props> = ({
  submit,
  defaultValue = '',
  clearOnSubmit = true,
  placeholder = ''
}) => {
  const ref = useRef<any>();
  const [text, setText] = useState(defaultValue);
  // const [isEmojiOpen, setEmojiOpen] = useState(false);
  // const toggleEmoji = useCallback(() => setEmojiOpen(!isEmojiOpen), [
  //   isEmojiOpen
  // ]);
  // const addEmoji = React.useCallback(
  //   (code, obj) => {
  //     // console.log(code, obj);
  //     if (!ref.current) {
  //       return;
  //     }
  //     const textarea = ref.current as HTMLTextAreaElement;
  //     const selectionStart = textarea.selectionStart;
  //     // const selectionEnd = textarea.selectionEnd
  //     const offset = dropEmoji(textarea, obj.emoji);
  //     const pos = selectionStart + offset;
  //     textarea.focus();
  //     // console.log([selectionStart,selectionEnd], offset, pos, [textarea.selectionStart, textarea.selectionEnd] )
  //     textarea.selectionEnd = pos;
  //   },
  //   [ref.current]
  // );
  const handleSubmit = useCallback(
    () => {
      submit(text);
      if (clearOnSubmit) {
        const textarea = ref.current as HTMLTextAreaElement;
        textarea.value = '';
      }
    },
    [ref.current, text]
  );
  const onChange = useCallback(
    () => {
      const textarea = ref.current as HTMLTextAreaElement;
      setText(textarea.value);
    },
    [ref.current, setText]
  );
  return (
    <Wrapper>
      <SocialTextDiv>
        <SocialTextArea
          placeholder={placeholder}
          ref={ref}
          defaultValue={defaultValue}
          onInput={onChange}
        />
        <SocialActions mr={3}>
          {/* <EmojiPickerTrigger onClick={toggleEmoji}>
            <Smile color={'rgba(0,0,0,.4)'} size="24" />
          </EmojiPickerTrigger> */}
          <Box style={{ cursor: 'pointer' }} ml={3} onClick={handleSubmit}>
            <Send color={'rgba(0,0,0,.4)'} size="24" />
          </Box>
        </SocialActions>
        {/* {isEmojiOpen && (
          <OutsideClickHandler onOutsideClick={toggleEmoji}>
            <PickerWrap>
              <EmojiPicker preload onEmojiClick={addEmoji} />
            </PickerWrap>
          </OutsideClickHandler>
        )} */}
      </SocialTextDiv>
    </Wrapper>
  );
};
export default SocialText;
