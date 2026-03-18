import { notFound } from "next/navigation";

import { StudyRunner } from "@/components/study-runner";
import {
  getStudyMetadata,
  isCondition,
  isStudyId,
} from "@/lib/experiments";
import type { StudySessionBootstrap } from "@/lib/types";

type StudyConditionPageProps = {
  params: Promise<{
    studyId: string;
    condition: string;
    pageNumber: string;
  }>;
  searchParams: Promise<{
    respondent_id?: string | string[];
    started_at?: string | string[];
    reset?: string | string[];
  }>;
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function StudyConditionPage({
  params,
  searchParams,
}: StudyConditionPageProps) {
  const { studyId, condition, pageNumber } = await params;
  const resolvedSearchParams = await searchParams;

  if (!isStudyId(studyId) || !isCondition(condition)) {
    notFound();
  }

  const currentPage = Number(pageNumber);
  const totalPages = getStudyMetadata(studyId).totalPages;

  if (!Number.isInteger(currentPage) || currentPage < 1 || currentPage > totalPages) {
    notFound();
  }

  const respondentId = firstParam(resolvedSearchParams.respondent_id)?.trim();
  const startedAt = firstParam(resolvedSearchParams.started_at);
  const reset = firstParam(resolvedSearchParams.reset);

  const bootstrap: StudySessionBootstrap | undefined = respondentId
    ? {
        respondentId,
        condition,
        startedAt,
        currentPage,
        reset: reset === "1" || reset === "true",
      }
    : undefined;

  return (
    <StudyRunner
      studyId={studyId}
      condition={condition}
      pageNumber={currentPage}
      bootstrap={bootstrap}
    />
  );
}
