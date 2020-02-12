import React, {
  useRef,
  useState,
  useCallback,
  MutableRefObject,
  useEffect
} from 'react';
import { dropEmoji } from '../../../util/emoji';
import EmojiPicker from 'emoji-picker-react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';
import { Textarea } from '@rebass/forms';
import { Box, Flex } from 'rebass/styled-components';
import { Smile, Send } from 'react-feather';
const PickerWrap = styled.div`
  position: absolute;
  right: 10px;
  top: 45px;
  .--rtl & {
    left: 10px;
    right: auto;
  }
  z-index: 9999;
`;
const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;
const SocialTextDiv = styled(Flex)`
  position: relative;
  width: 100%;
  align-items: center;
`;
const SocialTextTrigger = styled(Box)`
  cursor: pointer;
`;

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
  // position: absolute;
  // right: 10px;
  // top: 16px;
  width: 70px;
  .--rtl & {
    left: 10px;
    right: auto;
  }
`;

export interface Props
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  reference?: MutableRefObject<HTMLTextAreaElement | undefined>;
  submit(): void;
}
export const SocialText: React.FC<Props> = props => {
  const ref = useRef<any>();
  const [isOpen, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen(!isOpen), [isOpen]);
  const addEmoji = React.useCallback(
    (code, obj) => {
      console.log(code, obj);
      if (!ref.current) {
        return;
      }
      const textarea = ref.current as HTMLTextAreaElement;
      const selectionStart = textarea.selectionStart;
      // const selectionEnd = textarea.selectionEnd
      const offset = dropEmoji(textarea, obj.emoji);
      const pos = selectionStart + offset;
      textarea.focus();
      // console.log([selectionStart,selectionEnd], offset, pos, [textarea.selectionStart, textarea.selectionEnd] )
      textarea.selectionEnd = pos;
    },
    [ref.current]
  );
  useEffect(
    () => {
      const current = ref.current;
      props.reference && (props.reference.current = current);
    },
    [ref.current]
  );
  return (
    <Wrapper>
      <SocialTextDiv>
        <SocialTextArea ref={ref} {...props} />
        <SocialActions>
          <SocialTextTrigger onClick={toggle}>
            <Smile color={'rgba(0,0,0,.4)'} size="24" />
          </SocialTextTrigger>
          <Box style={{ cursor: 'pointer' }} ml={3} onClick={props.submit}>
            <Send color={'rgba(0,0,0,.4)'} size="24" />
          </Box>
        </SocialActions>
        {isOpen ? (
          <OutsideClickHandler onOutsideClick={toggle}>
            <PickerWrap>
              <EmojiPicker preload onEmojiClick={addEmoji} />
            </PickerWrap>
          </OutsideClickHandler>
        ) : null}
      </SocialTextDiv>
    </Wrapper>
  );
};
export default SocialText;
