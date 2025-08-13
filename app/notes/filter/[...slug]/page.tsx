import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { NoteSearchResponse } from "@/lib/api";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug?: string[] }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = (await params).slug?.[0] || "All";

  const notes = await fetchNotes({ tag, searchQuery: "", page: 1 });
  const firstNote = notes.notes[0];

  return {
    title: `Note: ${firstNote.title} | NoteHub`,
    description: firstNote.content.slice(0, 30),
    openGraph: {
      title: `Note: ${firstNote.title}`,
      description: firstNote.content.slice(0, 100),
      url: `https://notehub.com/notes/filter/${tag}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: firstNote.title,
        },
      ],
      type: "website",
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const paramsQuery = await params;
  const [tag] = paramsQuery.slug || [];
  const page = 1;

  const initialData: NoteSearchResponse = await fetchNotes({
    tag,
    searchQuery: "",
    page,
  });

  return <NotesClient initialData={initialData} tag={tag} />;
}
