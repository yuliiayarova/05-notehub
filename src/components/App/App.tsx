import { useState } from "react";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";

export default function App() {
  const [page, setPage] = useState(1);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", page],
    queryFn: () => fetchNotes({ page }),
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {isSuccess && totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
        {/* Кнопка створення нотатки */}
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
