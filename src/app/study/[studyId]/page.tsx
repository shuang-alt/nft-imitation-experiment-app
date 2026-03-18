import { redirect } from "next/navigation";

type StudyEntryPageProps = {
  params: Promise<{
    studyId: string;
  }>;
};

export default async function StudyEntryPage({ params }: StudyEntryPageProps) {
  await params;
  redirect("/");
}
