import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import * as color from './color'
import { Button, ConfirmButton } from './Button'

export function InputForm({
  value,
  onChange,
  onConfirm,
  onCancel,
  className,
}: {
  value?: string
  onChange?(value: string): void
  onConfirm?(): void
  onCancel?(): void
  className?: string
}) {
  const disabled = !value?.trim()
  const handleConfirm = () => {
    if (disabled) return
    onConfirm?.()
  }

  // カスタムフック 関数に処理を切り出して使用
  const ref = useAutoFitToContentHeight(value)

  return (
    <Container className={className}>
      <Input
        ref={ref} // ref propsとして渡すとHTML要素の実態が保持できる ここではtextarea
        autoFocus
        placeholder="Enter a note"
        value={value}
        onChange={ev => onChange?.(ev.currentTarget.value)}
        onKeyDown={ev => {
          if (!((ev.metaKey || ev.ctrlKey) && ev.key === 'Enter')) return
          handleConfirm()
        }}
      />

      <ButtonRow>
        <AddButton disabled={disabled} onClick={handleConfirm} />
        <CancelButton onClick={onCancel} />
      </ButtonRow>
    </Container>
  )
}

// カスタムフック
// テキストエリアの高さを内容に合わせて自動調整する
// 引数のcontent＝valueが変わるたびにレンダリングされる
function useAutoFitToContentHeight(content: string | undefined) {
  const ref = useRef<HTMLTextAreaElement>(null) // useStateは、ミュータブル（変更可能な変数の型）な値を保持するオブジェクトを返す

  useEffect(
    () => {
      const el = ref.current
      if (!el) return

      const { borderTopWidth, borderBottomWidth } = getComputedStyle(el)
      el.style.height = 'auto' // 一度 auto にしないと高さが縮まなくなる
      el.style.height = `calc(${borderTopWidth} + ${el.scrollHeight}px + ${borderBottomWidth})`
    },
    // 内容が変わるたびに高さを再計算
    [content],
  )

  return ref
}

const Container = styled.div``

const Input = styled.textarea`
  display: block;
  width: 100%;
  margin-bottom: 8px;
  border: solid 1px ${color.Silver};
  border-radius: 3px;
  padding: 6px 8px;
  background-color: ${color.White};
  font-size: 14px;
  line-height: 1.7;

  :focus {
    outline: none;
    border-color: ${color.Blue};
  }
`

const ButtonRow = styled.div`
  display: flex;

  > :not(:first-child) {
    margin-left: 8px;
  }
`

const AddButton = styled(ConfirmButton).attrs({
  children: 'Add',
})``

const CancelButton = styled(Button).attrs({
  children: 'Cancel',
})``
