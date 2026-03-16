import axios from "axios";
import type { Note } from "../types/note";

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;
const ENDPOINT = "/notes";

const apiClient = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

interface FetchNotesParams {
  search?: string;
  tag?: string;
  page?: number;
  perPage?: number;
  sortBy?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNoteBody {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  const response = await apiClient.get<FetchNotesResponse>(ENDPOINT, {
    params,
  });
  return response.data;
}

export async function createNote(body: CreateNoteBody): Promise<Note> {
  const response = await apiClient.post<Note>(ENDPOINT, body);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await apiClient.delete<Note>(`${ENDPOINT}/${id}`);
  return response.data;
}
