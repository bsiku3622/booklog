import { useEffect, useMemo, useState, type SyntheticEvent } from "react";
import {
  Box,
  Button,
  Divider,
  Field,
  Icon,
  Inline,
  PaperProvider,
  Stack,
  Text,
} from "@studio-baeks/paper-ui";

import "@studio-baeks/paper-ui/styles.css";
import "./Booklog.css";

type Status = "want" | "reading" | "finished";
type Book = {
  id: string;
  title: string;
  author: string;
  status: Status;
  review: string;
  rating: number;
  finishedOn: string;
  cover: number;
};

const STORAGE_KEY = "booklog:books:v1";
const initialBooks: Book[] = [
  { id: "bk-1", title: "불편한 편의점", author: "김호연", status: "want", review: "", rating: 0, finishedOn: "", cover: 0 },
  { id: "bk-2", title: "아주 희미한 빛으로도", author: "최은영", status: "reading", review: "", rating: 0, finishedOn: "", cover: 1 },
  { id: "bk-3", title: "모순", author: "양귀자", status: "finished", review: "마음 한구석에 오래 남는 문장들이 있었다. 다시 펼치고 싶은 책.", rating: 5, finishedOn: "2026. 9. 18.", cover: 2 },
];

const tabs: { id: Status; label: string }[] = [
  { id: "want", label: "읽고 싶어요" },
  { id: "reading", label: "읽는 중" },
  { id: "finished", label: "다 읽었어요" },
];

const uid = () => crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

function BookIcon() {
  return <Icon aria-hidden><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22.5v-17Z" /><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M8 7h8M8 11h8" /></Icon>;
}

function BooklogApp() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [tab, setTab] = useState<Status>("want");
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [reviewDraft, setReviewDraft] = useState("");
  const [ratingDraft, setRatingDraft] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setBooks(parsed as Book[]);
      }
    } catch {
      // Keep the example shelf if browser storage is unavailable.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books, ready]);

  const visibleBooks = useMemo(() => books.filter((book) => book.status === tab), [books, tab]);
  const counts = useMemo(() => Object.fromEntries(tabs.map(({ id }) => [id, books.filter((book) => book.status === id).length])) as Record<Status, number>, [books]);

  const addBook = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return;
    setBooks((previous) => [{
      id: uid(), title: title.trim(), author: author.trim() || "작가 미입력", status: "want",
      review: "", rating: 0, finishedOn: "", cover: previous.length % 5,
    }, ...previous]);
    setTitle("");
    setAuthor("");
    setAdding(false);
    setTab("want");
  };

  const moveBook = (book: Book, status: Status) => {
    setBooks((previous) => previous.map((item) => item.id === book.id
      ? { ...item, status, finishedOn: status === "finished" ? new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "short", day: "numeric" }).format(new Date()) : "" }
      : item));
    setTab(status);
    if (status === "finished") {
      setEditingReview(book.id);
      setReviewDraft(book.review);
      setRatingDraft(book.rating);
    }
  };

  const startReview = (book: Book) => {
    setEditingReview(book.id);
    setReviewDraft(book.review);
    setRatingDraft(book.rating);
  };

  const saveReview = (bookId: string) => {
    setBooks((previous) => previous.map((book) => book.id === bookId
      ? { ...book, review: reviewDraft.trim(), rating: ratingDraft }
      : book));
    setEditingReview(null);
  };

  const sectionCopy: Record<Status, { title: string; description: string }> = {
    want: { title: "언젠가 읽고 싶은 책", description: "마음에 담아둔 책을 이곳에 모아두세요." },
    reading: { title: "천천히 읽는 중", description: "지금 페이지를 넘기고 있는 책들이에요." },
    finished: { title: "다 읽은 책", description: "읽은 책에는 그때의 감상을 남겨보세요." },
  };

  return (
    <Box className="booklog-shell" surface="canvas" minHeight="100dvh">
      <Box as="header" className="booklog-header" surface="raised">
        <Inline className="header-inner" align="center" justify="between">
          <Inline className="brand" align="center" gap="sm">
            <img src="/favicon.svg" alt="" width="22" height="22" />
            <Text as="p" variant="subheading">책갈피</Text>
          </Inline>
          <Text as="span" variant="caption" ink="soft">나만의 책장</Text>
        </Inline>
      </Box>

      <Stack as="main" className="booklog-main" gap="xl">
        <Stack className="intro" gap="sm">
          <Text as="h1" variant="title">책과 함께한 시간을 모아요</Text>
          <Text as="p" variant="body" ink="soft">읽고 싶은 책을 적어두고, 다 읽은 뒤에는 나만의 감상을 남겨보세요.</Text>
        </Stack>

        <Box as="section" aria-label="책장">
          <Inline className="shelf-tools" align="center" justify="between" gap="md">
            <nav className="shelf-tabs" aria-label="책 상태">
              {tabs.map((item) => (
                <button key={item.id} type="button" className={`shelf-tab${tab === item.id ? " is-active" : ""}`} onClick={() => { setTab(item.id); setEditingReview(null); }} aria-current={tab === item.id ? "page" : undefined}>
                  {item.label}<span className="tab-count">{counts[item.id]}</span>
                </button>
              ))}
            </nav>
            <Button size="sm" variant="outline" onClick={() => setAdding((value) => !value)}>
              {adding ? "닫기" : "책 추가"}
            </Button>
          </Inline>

          {adding ? (
            <Box as="form" className="add-book-form" onSubmit={addBook}>
              <Stack gap="sm">
                <Text as="h2" variant="subheading">책장에 책 추가</Text>
                <Inline className="form-fields" gap="sm">
                  <Field autoFocus value={title} onChange={(event) => setTitle(event.currentTarget.value)} placeholder="책 제목" aria-label="책 제목" />
                  <Field value={author} onChange={(event) => setAuthor(event.currentTarget.value)} placeholder="작가" aria-label="작가" />
                </Inline>
                <Inline justify="end" gap="sm">
                  <Button type="button" variant="ghost" onClick={() => setAdding(false)}>취소</Button>
                  <Button type="submit" disabled={!title.trim()}>책장에 담기</Button>
                </Inline>
              </Stack>
            </Box>
          ) : null}

          <Box className="shelf-heading">
            <Text as="h2" variant="heading">{sectionCopy[tab].title}</Text>
            <Text as="p" variant="caption" ink="soft">{sectionCopy[tab].description}</Text>
          </Box>

          {visibleBooks.length ? (
            <ul className="book-list">
              {visibleBooks.map((book) => (
                <li className="book-entry" key={book.id}>
                  <div className={`book-cover cover-${book.cover % 5}`} aria-label={`『${book.title}』 표지`}>
                    <span className="cover-author">{book.author}</span>
                    <span className="cover-title">{book.title}</span>
                    <span className="cover-mark" aria-hidden="true">책갈피</span>
                  </div>
                  <div className="book-copy">
                    <Text as="h3" variant="subheading">{book.title}</Text>
                    <Text as="p" variant="caption" ink="soft">{book.author}</Text>
                    {tab === "finished" && book.finishedOn ? <Text as="p" variant="caption" ink="faint">{book.finishedOn} 완독</Text> : null}
                    {tab === "finished" && book.review && editingReview !== book.id ? (
                      <div className="review-snippet">
                        <Text as="p" variant="body">{book.review}</Text>
                        <Text as="span" variant="caption" ink="soft">{"★".repeat(book.rating)}{"☆".repeat(5 - book.rating)}</Text>
                      </div>
                    ) : null}
                    {editingReview === book.id ? (
                      <div className="review-editor">
                        <label className="review-label" htmlFor={`review-${book.id}`}>읽고 난 뒤 남기고 싶은 말</label>
                        <textarea id={`review-${book.id}`} rows={3} value={reviewDraft} onChange={(event) => setReviewDraft(event.currentTarget.value)} placeholder="마음에 남은 문장이나 감상을 적어보세요." />
                        <div className="review-actions">
                          <div className="rating-picker" aria-label="별점">
                            {[1, 2, 3, 4, 5].map((rating) => <button key={rating} type="button" className={rating <= ratingDraft ? "is-selected" : ""} onClick={() => setRatingDraft(rating)} aria-label={`${rating}점`}>★</button>)}
                          </div>
                          <Inline gap="xs">
                            <Button size="sm" variant="ghost" onClick={() => setEditingReview(null)}>취소</Button>
                            <Button size="sm" onClick={() => saveReview(book.id)}>감상 저장</Button>
                          </Inline>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="book-actions">
                    {tab === "want" ? <Button size="sm" variant="ghost" onClick={() => moveBook(book, "reading")}>읽기 시작</Button> : null}
                    {tab === "reading" ? <Button size="sm" variant="outline" onClick={() => moveBook(book, "finished")}>다 읽었어요</Button> : null}
                    {tab === "finished" && editingReview !== book.id ? <Button size="sm" variant="ghost" onClick={() => startReview(book)}>{book.review ? "감상 편집" : "독후감 쓰기"}</Button> : null}
                    {tab === "finished" ? <button className="remove-book" type="button" aria-label={`${book.title} 책장에서 삭제`} onClick={() => setBooks((previous) => previous.filter((item) => item.id !== book.id))}>삭제</button> : null}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-shelf">
              <BookIcon />
              <Text as="p" variant="body" ink="soft">{tab === "want" ? "담아두고 싶은 책을 찾아보세요." : tab === "reading" ? "읽기 시작한 책이 여기에 보여요." : "완독한 책이 이곳에 모입니다."}</Text>
              {tab === "want" ? <Button size="sm" variant="ghost" onClick={() => setAdding(true)}>책 한 권 담기</Button> : null}
            </div>
          )}
        </Box>

        <Divider />
        <Text as="p" variant="caption" ink="faint" className="storage-note">책장은 이 기기에 저장됩니다.</Text>
      </Stack>
    </Box>
  );
}

export default function Booklog() {
  return <PaperProvider defaultTheme="system"><BooklogApp /></PaperProvider>;
}
