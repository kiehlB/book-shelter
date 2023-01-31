import classNames from 'classnames';
import styled from 'styled-components';
import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { BASE_SIZE, ICON_SIZE_MD } from '../../lib/constants';
import Table from './Table';
import moment from 'moment';
import { RootState } from '../../store/rootReducer';
import { initBook } from '../../store/book';
import clsx from 'clsx';

interface HistoryTableProps {
  data?: any;
  autoFocus?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  selectedRecordIds?: number[];
  onRowClick?: any;
  status: string;
}

enum HistoryTableSortOrder {
  DurationAscending = 'DURATION_ASCENDING',
  DurationDescending = 'DURATION_DESCENDING',
  TimeAscending = 'TIME_ASCENDING',
  TimeDescending = 'TIME_DESCENDING',
}

const ROW_HEIGHT = BASE_SIZE * 20;
const DEFAULT_SORT_ORDER = 'TIME_DESCENDING' as HistoryTableSortOrder;
const SORT_OPTIONS = [
  {
    buttonLabel: '정확도순 (accuracy)',
    optionLabel: '정확도순',
    optionSublabel: 'Ascending',
    value: 'DURATION_ASCENDING' as HistoryTableSortOrder,
    sortFn: data =>
      data
        .slice()
        .sort((a, b) => (a.endTime - a.startTime > b.endTime - b.startTime ? 1 : -1)),
  },
  {
    buttonLabel: '최신순 (recency)',
    optionLabel: '최신순',
    optionSublabel: 'Descending',
    value: 'DURATION_DESCENDING' as HistoryTableSortOrder,
    sortFn: data =>
      data
        .slice()
        .sort((a, b) => (a.endTime - a.startTime > b.endTime - b.startTime ? -1 : 1)),
  },
  {
    buttonLabel: '기본값 (accuracy)',
    optionLabel: '기본값',
    optionSublabel: 'Ascending',
    value: 'TIME_ASCENDING' as HistoryTableSortOrder,
    sortFn: data => data.slice().sort((a, b) => (a.startTime > b.startTime ? 1 : -1)),
  },
];
const TITLE_PLACEHOLDER = '-';

function filterActivityRecords(data, filter: string) {
  return data?.filter(
    record =>
      record.url.toLowerCase().includes(filter) ||
      record.title.toLowerCase().includes(filter),
  );
}

function formatRecordString(count: number) {
  return `${count?.toLocaleString('en-US')} ${count > 1 ? 'records' : 'record'}`;
}

export const HistoryTableRow = ({ datum, clicked, handleClick }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={clsx(
        'border-b border-[#BDC1C6] p-4 bg-[#fff] hover:bg-[#E9E9E9] active:bg-[#ffffff] transition-all',
      )}
      data-activity-id={datum.isbn}
      style={{ background: clicked?.isbn == `${datum?.isbn}` ? '#cccccc' : null }}
      key={datum.isbn}
      onClick={e => {
        dispatch(initBook(datum));
        handleClick(e, datum);
      }}>
      <div className="flex dark:bg-[#1E1E1E]">
        {datum.thumbnail ? (
          <img
            src={datum.thumbnail}
            width="82px"
            height="116px"
            className="min-h-[116px]"
          />
        ) : (
          <div className="w-[82px] h-[116px] border-2 flex justify-center items-center text-xs text-[#121212]">
            이미지없음
          </div>
        )}

        <div className="ml-5 flex flex-col text-xs truncate whitespace-nowrap overflow-hidden dark:text-[#D9D9D9] w-full">
          <div className="flex justify-between w-full">
            <strong className="text-xl mmd:text-base">
              {datum.title || TITLE_PLACEHOLDER}
            </strong>
            <div className="mr-2">{moment(datum.datetime).format('YYYY-MM-DD')}</div>
          </div>
          <div className="py-[0.5rem]">{datum.authors.map(e => e)}</div>
          <div className="">
            <WithoutPostBody className="">{datum.contents}</WithoutPostBody>
          </div>
        </div>
      </div>
    </div>
  );
};

const BooksTableContainer = ({
  autoFocus,
  disabled,
  isLoading,
  onRowClick,
  selectedRecordIds,
  data,
  status,
}: HistoryTableProps) => {
  return (
    <Table
      autoFocus={autoFocus}
      data={data}
      defaultSortOrder={DEFAULT_SORT_ORDER}
      disabled={disabled}
      filterFn={filterActivityRecords}
      filterPlaceholder="검색 결과가 없습니다"
      formatEntries={formatRecordString}
      isLoading={isLoading}
      rowHeight={ROW_HEIGHT}
      rowRenderer={HistoryTableRow}
      onRowClick={onRowClick}
      selectedIds={selectedRecordIds}
      sortOptions={SORT_OPTIONS}
      status={status}
    />
  );
};

const ExternalLink = props => {
  return (
    <span className={classNames('external-link', props.className)} style={props.style}>
      {props.iconSrc && (
        <img className="external-link__icon" alt={props.iconAlt} src={props.iconSrc} />
      )}
      <a href={props.url} title={props.title || props.url} target="none">
        {props.children || props.url}
      </a>
    </span>
  );
};

export default React.memo(BooksTableContainer);
const WithoutPostBody = styled.section`
  color: #3c4858;
  font-weight: 500;
  display: block;
  display: -webkit-box;
  line-height: 1.5rem;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: initial;
  word-wrap: break-word;
  overflow: hidden;

  @media (max-width: 1280px) {
    line-height: 1.2rem;
  }
`;
