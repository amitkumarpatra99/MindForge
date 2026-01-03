"use client";
import Providers from "./Providers";
import Navigation from "./Navigation";
import NoteList from "./NoteList";
import MobileLayout from "./MobileLayout";

export default function ClientLayout({ children }) {
    return (
        <Providers>
            <MobileLayout
                navigation={<Navigation />}
                noteList={<NoteList />}
            >
                {children}
            </MobileLayout>
        </Providers>
    );
}
