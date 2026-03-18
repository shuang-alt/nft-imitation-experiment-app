import { redirect } from "next/navigation";

type StudyPageProps = {
  params: Promise<{
    studyId: string;
    pageNumber: string;
  }>;
};

export default async function StudyPage({ params }: StudyPageProps) {
  await params;
  redirect("/");
}
