import React from 'react'
import styled from 'styled-components'
import * as color from './color'
import { CheckIcon as _CheckIcon, TrashIcon } from './icon'

export function Card({ text }: { text?: string }) {
  return (
    <Container>
      <CheckIcon />
      {/* 正規表現 textにhttps://example.comのようなURLが含まれた場合にリンクに変える
			？：直前の文字0回か1回の出現にマッチする 今回は httpでもhttpsでもいいということ
			\/\/：/が正規表現の開始または終了と認識されないように前に\をつけてエスケープしている つまり//と書くための処置
			\S：空白以外の文字に一致
			g：グローバルサーチ（文字列全体に対してマッチングするか） */}
      {text?.split(/(https?:\/\/\S+)/g).map((fragment, i) =>
        i % 2 === 0 ? (
          <Text key={i}>{fragment}</Text>
        ) : (
          <Link key={i} href={fragment}>
            {fragment}
          </Link>
        ),
      )}

      <DeleteButton />
    </Container>
  )
}

const Container = styled.div.attrs({
  draggable: true,
})`
  position: relative;
  border: solid 1px ${color.Silver};
  border-radius: 6px;
  box-shadow: 0 1px 3px hsla(0, 0%, 7%, 0.1);
  padding: 8px 32px;
  background-color: ${color.White};
  cursor: move;
`

const CheckIcon = styled(_CheckIcon)`
  position: absolute;
  top: 12px;
  left: 8px;
  color: ${color.Green};
`

const DeleteButton = styled.button.attrs({
  type: 'button',
  children: <TrashIcon />,
})`
  position: absolute;
  top: 12px;
  right: 8px;
  font-size: 14px;
  color: ${color.Gray};

  :hover {
    color: ${color.Red};
  }
`

const Text = styled.span`
  color: ${color.Black};
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-wrap;
`

const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  color: ${color.Blue};
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-wrap;
`
