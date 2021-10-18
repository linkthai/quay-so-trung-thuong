import { useEffect, useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiDotsHorizontal,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from "react-icons/hi";
import useScreen from "../../../../lib/hooks/useScreen";
import { PaginationComponent } from "./pagination-component";

interface PropsType extends ReactProps {
  limit: number;
  page: number;
  total: number;
  onPageChange?: Function;
}
export function PaginationPrimary(props: PropsType) {
  const defaultButtonClass =
    `bg-gray-600 text-gray-50 disabled:opacity-40 disabled:pointer-events-none hover:text-primary rounded ` +
    `px-1 text-sm min-w-8 h-8 mx-0.5 sm:px-2 sm:text-base sm:min-w-9 sm:h-9 sm:mx-1 xl:text-xl xl:min-w-10 xl:h-10`;

  const screenXS = useScreen("xs");

  return (
    <PaginationComponent
      limit={props.limit}
      total={props.total}
      page={props.page}
      onPageChange={props.onPageChange}
      hasFirstLast={false}
      hasDots={true}
      visiblePageCount={screenXS ? 5 : 3}
      prevButtonClass={`${defaultButtonClass}`}
      nextButtonClass={`${defaultButtonClass}`}
      firstButtonClass={`${defaultButtonClass}`}
      lastButtonClass={`${defaultButtonClass}`}
      pageButtonClass={`${defaultButtonClass}`}
      dotsButtonClass={`${defaultButtonClass}`}
      pageActiveButtonClass={`${defaultButtonClass
        .replace(" text-gray-500", "")
        .replace(
          " hover:text-primary",
          ""
        )} bg-primary border-primary text-white hover:text-white`}
      prevButtonContent={
        <i className="text-md sm:text-xl">
          <HiChevronLeft />
        </i>
      }
      nextButtonContent={
        <i className="text-md sm:text-xl">
          <HiChevronRight />
        </i>
      }
      firstButtonContent={
        <i className="text-lg">
          <HiChevronDoubleLeft />
        </i>
      }
      lastButtonContent={
        <i className="text-lg">
          <HiChevronDoubleRight />
        </i>
      }
      dotsButtonContent={
        <i className="text-md sm:text-lg">
          <HiDotsHorizontal />
        </i>
      }
    />
  );
}
