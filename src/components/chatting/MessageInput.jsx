import React from "react";
import styled from "styled-components";

import Grid from "../../elements/Grid";

const MessageInput = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    is_submit,
    onSubmit,
    MessageWrite,
    // loading,
  } = props;
  const loading = true;
  if (multiLine) {
    return (
      <Grid>
        {label && <p margin="0px">{label}</p>}
        <StTextarea
          rows={13}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
        ></StTextarea>
      </Grid>
    );
  }

  // 메시지 작성 폼
  if (MessageWrite) {
    return (
      <React.Fragment>
        {loading ? (
          <StMessageWrite
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit(e);
              }
            }}
          ></StMessageWrite>
        ) : (
          <StMessageWrite value="메시지 전송중 ..."></StMessageWrite>
        )}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {label && <p margin="0px">{label}</p>}
      {is_submit ? (
        <StInput
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          value={value}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSubmit(e);
            }
          }}
        />
      ) : (
        <StInput type={type} placeholder={placeholder} onChange={_onChange} />
      )}
    </React.Fragment>
  );
};

MessageInput.defaultProps = {
  MessageWrite: false,
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  is_submit: false,
  onSubmit: () => {},
  _onChange: () => {},
};

export default MessageInput;

const StTextarea = styled.textarea`
  border: none;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const StInput = styled.input`
  border: none;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

// 메시지 입력 폼
const StMessageWrite = styled.input`
  /* background-color: ${(props) => props.theme.main_color_thick}; */
  border: none;
  width: 90%;
  margin-left: 10px;
  padding: 12px 4px;
  box-sizing: border-box;
  color: #1e1e1e;
  font-size: 20px;
  outline: none;
`;
