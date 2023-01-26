import styled from "styled-components";

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
      <div class="text-center m-tb80 pd-buttom100">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="btn btn-default btn-transparent">
          &lt;
        </button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
              className={page==i+1?"btn btn-default activeBtn":"btn btn-default"}
            >
              {i + 1}
            </button>
          ))}
        <button onClick={() => setPage(page + 1)} disabled={page === numPages} className="btn btn-default btn-transparent">
          &gt;
        </button>
      </div>
  );
}

// const Nav = styled.nav`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 4px;
//   margin: 16px;
// `;

const Button = styled.button`
  // border: none;
  // border-radius: 8px;
  // padding: 8px;
  // margin: 0;
  // // background: orange;
  // color: black;
  // font-size: 1rem;

  // &:hover {
  //   // background: tomato;
  //   cursor: pointer;
  //   transform: translateY(-2px);
  // }

  // &[disabled] {
  //   // background: grey;
  //   cursor: revert;
  //   transform: revert;
  // }

  // &[aria-current] {
  //   // background: deeppink;
  //   font-weight: bold;
  //   cursor: revert;
  //   transform: revert;
  // }
`;

export default Pagination;
