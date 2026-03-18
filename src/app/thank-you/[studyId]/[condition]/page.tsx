import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

import {
  buildStudyEntryPath,
  getConditionLabel,
  getStudyMetadata,
  isCondition,
  isStudyId,
} from "@/lib/experiments";

type ThankYouPageProps = {
  params: Promise<{
    studyId: string;
    condition: string;
  }>;
};

export default async function ConditionThankYouPage({ params }: ThankYouPageProps) {
  const { studyId, condition } = await params;

  if (!isStudyId(studyId) || !isCondition(condition)) {
    notFound();
  }

  const study = getStudyMetadata(studyId);
  const conditionLabel = getConditionLabel(condition);

  return (
    <main className="flex min-h-screen items-center px-4 py-8 md:px-6">
      <div className="mx-auto max-w-3xl rounded-[40px] border border-white/80 bg-white/85 p-8 text-center shadow-[0_32px_100px_rgba(15,23,42,0.12)] backdrop-blur-xl md:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Submission Completed
        </p>
        <h1 className="mt-3 font-display text-4xl text-slate-950 md:text-5xl">
          Thank you
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          您已完成 {study.shortLabel} / {conditionLabel} 的全部页面。感谢参与。
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={buildStudyEntryPath(studyId, condition)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Return to {study.shortLabel} / {conditionLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Open Admin Preview
          </Link>
        </div>
      </div>
    </main>
  );
}
