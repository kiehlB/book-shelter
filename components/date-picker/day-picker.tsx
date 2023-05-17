import React, { useRef, useState } from 'react';
import { CaptionProps, DayPicker, useNavigation } from 'react-day-picker';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { ko } from 'date-fns/locale';
import { addDays, format } from 'date-fns';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styled from 'styled-components';
import { getTimestamp } from '../../store/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../../store/rootReducer';

function CustomCaption(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <h2 className="mb-4 flex items-center justify-center">
      <button
        className="mr-4 dark:text-white"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}>
        <IoIosArrowBack />
      </button>

      <div className="dark:text-white"> {format(props.displayMonth, 'yyy.MM')}</div>

      <button
        className="ml-4 dark:text-white"
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}>
        <IoIosArrowForward />
      </button>
    </h2>
  );
}

const DateRangePicker = ({ onChange, range, ranges, setRange, ...otherProps }) => {
  const { isdark } = useSelector((state: RootState) => state.core);

  const buttonRef = useRef() as any;
  const dispatch = useDispatch();
  const router = useRouter();

  let initialFrom: Date | null = null;
  let initialTo: Date | null = null;

  const [to, setTo] = useState<Date | null>(null);
  const [from, setFrom] = useState<Date | null>(initialFrom);
  const [isSelectingFirstDay, setIsSelectingFirstDay] = useState(true);
  let footer = (
    <div className="mx-auto flex w-[60%] items-center justify-between px-2">
      <span>취소</span>
      <span className="cursor-pointer rounded-3xl bg-[#FCD535] px-[20px] py-[12px] text-sm font-semibold text-[#181A20] hover:text-[#5b646d] mxs:hidden">
        완료
      </span>
    </div>
  );

  const today = new Date();
  const disabledDays = [
    { from: new Date(0, 0, 0), to: new Date(2023, 1, 8) },
    { from: addDays(today, 1), to: new Date(9999, 2, 9) },
  ];

  const handleDayClick = (day: Date) => {
    if (isSelectingFirstDay) {
      setIsSelectingFirstDay(false);
      setFrom(day);
    } else {
      setIsSelectingFirstDay(true);
      setTo(day);

      if (from && to) {
        (buttonRef as any)?.current?.click();

        dispatch(
          getTimestamp({
            from: from,
            to: to,
          }),
        );
      }
    }
  };

  const handleDayMouseEnter = (day: Date) => {
    setTo(day);
  };

  const start = isSelectingFirstDay ? initialFrom : from;
  const end = isSelectingFirstDay ? initialTo : to;
  let modifiers: { start: Date; end: Date };
  let selectedDays: [Date, { from: Date; to: Date }];
  if (start !== null && end !== null) {
    modifiers = start < end ? { start, end } : { start: end, end: start };
    selectedDays = [start, { from: start, to: end }];
  }

  const handleRangeClick = range => {
    if (range) {
      router.push('/trending');
      dispatch(getTimestamp(range));
      (buttonRef as any)?.current?.click();
    }
  };

  const resetTime = () => {
    setRange(null);
  };

  return (
    <>
      <div className="z-[8] ml-4 max-w-sm">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button ref={buttonRef} className="flex items-end outline-none">
                <IoCalendarNumberOutline
                  size={24}
                  className="text-[#4b4b4b] hover:text-[#212529] dark:text-[#CFCFCF]"
                  onClick={() => resetTime()}
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1">
                <Popover.Panel className="absolute right-0 w-[300px] overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <DayWrapper
                    isdark={isdark}
                    className="relative grid bg-white dark:bg-[#212227] dark:text-white lg:grid-cols-1">
                    {ranges && (
                      <div className="flex flex-col border-b dark:bg-[#212227]">
                        {ranges.map(range => (
                          <div
                            key={range.label}
                            className="rounded py-2 text-center text-xs font-bold text-[#475569] hover:bg-slate-100 dark:text-[#cfcfcf] dark:hover:bg-[#32333a] dark:hover:text-[#cfcfcf] "
                            onClick={() => {
                              handleRangeClick(range.value);
                            }}>
                            {range.label}
                          </div>
                        ))}
                      </div>
                    )}

                    <DayPicker
                      disabled={disabledDays}
                      locale={ko}
                      onDayClick={(day: Date) => handleDayClick(day)}
                      onDayMouseEnter={handleDayMouseEnter}
                      className="Selectable"
                      {...otherProps}
                      components={{
                        Caption: CustomCaption,
                      }}
                    />
                  </DayWrapper>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </>
  );
};

export default React.memo(DateRangePicker);

const DayWrapper = styled.div<{ isdark: string }>`
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    background-color: #fcd535;
    color: ${props => (props.isdark == 'dark' ? '#212529' : '#212529')};
    &:hover {
      font-weight: 700;
    }
  }
  .rdp-cell {
    color: ${props => (props.isdark == 'dark' ? '#ececec' : '#212529')};
  }
  .react-datepicker__header {
    background-color: #fff;
  }
  .rdp {
    margin: 1rem 0rem;
    padding-left: 0.5rem;
  }

  .rdp-day_selected {
    color: #212529;
    font-weight: bold;
  }

  .rdp {
    --rdp-cell-size: 40px;
    --rdp-accent-color: #fcd535;
    --rdp-background-color: #e7edff;
    /* Switch to dark colors for dark themes */
    --rdp-accent-color-dark: #212529;
    --rdp-background-color-dark: #fcd535;
    color: #212529;
    /* Outline border for focused elements */
    --rdp-outline: 2px solid var(--rdp-accent-color);
    /* Outline border for focused and selected elements */
    --rdp-outline-selected: 2px solid rgba(0, 0, 0, 0.75);
  }
`;
