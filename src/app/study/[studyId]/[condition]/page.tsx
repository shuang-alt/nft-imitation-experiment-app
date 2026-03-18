import { notFound, redirect } from "next/navigation";

import { buildStudyPagePath, isCondition, isStudyId } from "@/lib/experiments";

type StudyConditionEntryPageProps = {
  params: Promise<{
    studyId: string;
    condition: string;
  }>;
};

export default async function StudyConditionEntryPage({
  params,
}: StudyConditionEntryPageProps) {
  const { studyId, condition } = await params;

  if (!isStudyId(studyId) || !isCondition(condition)) {
    notFound();
  }

  redirect(buildStudyPagePath(studyId, condition, 1));
}
