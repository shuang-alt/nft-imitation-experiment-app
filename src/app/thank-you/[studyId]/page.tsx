import { redirect } from "next/navigation";

type ThankYouPageProps = {
  params: Promise<{
    studyId: string;
  }>;
};

export default async function ThankYouPage({ params }: ThankYouPageProps) {
  await params;
  redirect("/");
}
