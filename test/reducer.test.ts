import baretest from 'baretest'
import assert from 'assert'
import produce from 'immer'
import { reducer, State } from '../src/reducer'

const test = baretest('reducer')

const initialState: State = {
  filterValue: '',
}

// テストケースの追加処理 test(テスト名, 具体的なテスト内容)
test('Filter.SetFilter', async () => {
  // アクション実行前
  const prev = produce(initialState, draft => {
    draft.filterValue = 'hello'
  })
  // reducerを使ったアクション実行後
  const next = reducer(prev, {
    type: 'Filter.SetFilter',
    payload: {
      value: 'welcome',
    },
  })
  // Immerを使って期待値expectedをそれぞれ作り検証
  const expected = produce(prev, draft => {
    draft.filterValue = 'welcome'
  })
  // nextとexpectedが等しいことを検証する
  assert.deepStrictEqual(next, expected)
})

test.run()
