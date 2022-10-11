import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginator = ({ path, pages, page, search = "", arrows = false }) => {
  return (
    pages > 1 && (
      <Pagination>
        {arrows ? (
          <>
            <LinkContainer
              to={`${path}?page=1${search ? `&search=${search}` : ""}`}
            >
              <Pagination.First disabled={page === 1} />
            </LinkContainer>
            <LinkContainer
              to={`${path}?page=${page - 1}${
                search ? `&search=${search}` : ""
              }`}
            >
              <Pagination.Prev disabled={page === 1} />
            </LinkContainer>
          </>
        ) : null}
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={`${path}?page=${x + 1}${search ? `&search=${search}` : ""}`}
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
        {arrows ? (
          <>
            <LinkContainer
              to={`${path}?page=${page + 1}${
                search ? `&search=${search}` : ""
              }`}
            >
              <Pagination.Next disabled={page === pages} />
            </LinkContainer>
            <LinkContainer
              to={`${path}?page=${pages}${search ? `&search=${search}` : ""}`}
            >
              <Pagination.Last disabled={page === pages} />
            </LinkContainer>
          </>
        ) : null}
      </Pagination>
    )
  );
};

export default Paginator;
