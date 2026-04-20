import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { createPortal } from 'react-dom'
import { updateNickname } from '../../api/users'
import Card from './Card'
import Icon from './Icon'
import UL from './UL'

const AUTH_ME_QUERY_KEY = ['auth', 'me']
const NICKNAME_SUGGESTIONS = ['냠냠이', '점심탐정', '학식러버', '오늘은한식', '돈까스킬러']

function validateNickname(nickname) {
  if (!nickname) {
    return ''
  }

  if (nickname.length < 2) {
    return '닉네임은 2자 이상이어야 해요'
  }

  if (nickname.length > 12) {
    return '닉네임은 12자 이하로 입력해주세요'
  }

  return ''
}

export default function NicknameSetupModal({ onClose }) {
  const queryClient = useQueryClient()
  const inputRef = useRef(null)
  const [nickname, setNickname] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const normalizedNickname = nickname.trim()
  const validationMessage = validateNickname(normalizedNickname)
  const isValid = normalizedNickname.length >= 2 && normalizedNickname.length <= 12
  const helperMessage = submitError || validationMessage || (isValid ? '형식 확인됨' : '2~12자로 입력해주세요')
  const helperColor = submitError || validationMessage
    ? 'text-red'
    : isValid
      ? 'text-green'
      : 'text-mute'

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus()
    }, 60)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    window.addEventListener('keydown', handleKeyDown, true)

    return () => {
      document.body.style.overflow = previousOverflow
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [])

  const handleSuggestionClick = (suggestion) => {
    setNickname(suggestion)
    setSubmitError('')
    inputRef.current?.focus()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!isValid || isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      await updateNickname(normalizedNickname)
      queryClient.setQueryData(AUTH_ME_QUERY_KEY, (previousUser) => {
        if (!previousUser) {
          return previousUser
        }

        return {
          ...previousUser,
          nickname: normalizedNickname,
          isNicknameSet: true,
        }
      })
      queryClient.invalidateQueries({ queryKey: AUTH_ME_QUERY_KEY })
      onClose()
    } catch (error) {
      const status = error.response?.status
      const message = error.response?.data?.message

      if (status === 409 && message?.includes('이미 사용')) {
        setSubmitError('이미 사용 중인 닉네임입니다')
      } else {
        setSubmitError(message ?? '닉네임 저장에 실패했습니다')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(43,34,24,0.34)] px-4 py-6 animate-fadeIn">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="nickname-setup-title"
        className="w-full max-w-[420px] rounded-[28px] border-[1.5px] border-ink bg-paper shadow-pop animate-slideUp"
      >
        <div className="border-b border-dashed border-rule px-5 py-4">
          <div className="font-hand text-sm text-mute">2 / 2 · 마지막 단계</div>
          <h2
            id="nickname-setup-title"
            className="mt-2 font-disp text-[1.9rem] leading-[1.15] text-ink"
          >
            리뷰에 쓸
            <br />
            <UL>닉네임</UL>을 정해주세요
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-5">
          <Card bg="#FFFFFF" style={{ padding: '16px 16px 14px' }}>
            <label htmlFor="nickname-input" className="sr-only">
              닉네임
            </label>
            <div className="flex items-end gap-2">
              <input
                ref={inputRef}
                id="nickname-input"
                value={nickname}
                maxLength={13}
                disabled={isSubmitting}
                onChange={(event) => {
                  setNickname(event.target.value)
                  setSubmitError('')
                }}
                placeholder="닉네임을 입력하세요"
                className="min-w-0 flex-1 border-none bg-transparent font-disp text-[1.7rem] leading-none text-ink outline-none placeholder:font-hand placeholder:text-lg placeholder:text-mute"
              />
              <span className="mb-[2px] inline-block h-7 w-[2px] animate-pulse rounded-full bg-orange" />
            </div>
          </Card>

          <div className="mt-2 flex items-center justify-between px-1">
            <p className={`font-hand text-xs ${helperColor}`}>
              {helperMessage}
            </p>
            <span className="font-hand text-xs text-inkSoft">
              {normalizedNickname.length} / 12
            </span>
          </div>

          <div className="mt-4 rounded-2xl border border-rule bg-orangeSoft/65 px-4 py-3">
            <div className="flex items-start gap-2">
              <span className="mt-0.5">
                <Icon name="pencil" size={16} color="#EF8A3D" />
              </span>
              <p className="font-hand text-sm leading-5 text-inkSoft">
                한 번 정하면 30일 동안 변경하기 어려워요
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 font-hand text-sm text-mute">✨ 추천 닉네임</div>
            <div className="flex flex-wrap gap-2">
              {NICKNAME_SUGGESTIONS.map((suggestion) => {
                const isSelected = normalizedNickname === suggestion

                return (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`rounded-full border-[1.5px] px-3 py-2 font-disp text-sm shadow-card transition-transform active:scale-[0.98] ${
                      isSelected
                        ? 'border-ink bg-yellowSoft text-ink'
                        : 'border-ink bg-white text-ink'
                    }`}
                  >
                    {suggestion}
                  </button>
                )
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`mt-8 flex w-full items-center justify-center gap-2 rounded-[14px] border-[1.8px] border-ink px-5 py-3 font-disp text-base shadow-flat transition-transform ${
              !isValid || isSubmitting
                ? 'cursor-not-allowed bg-paperDeep text-mute'
                : 'bg-ink text-paper active:scale-[0.99]'
            }`}
          >
            <span>{isSubmitting ? '확인 중...' : '시작하기'}</span>
            <Icon
              name="chevR"
              size={16}
              color={!isValid || isSubmitting ? '#8E7A66' : '#FBF6EC'}
            />
          </button>
        </form>
      </div>
    </div>,
    document.body
  )
}
