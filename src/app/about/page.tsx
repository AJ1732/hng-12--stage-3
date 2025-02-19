"use client";

import { cn } from "@/lib/utils";

const AboutPage = () => {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl space-y-8 px-6 pb-8 pt-12 [&_p]:leading-[175%] [&_p]:text-gray-600 [&_p]:dark:text-gray-400",
      )}
    >
      {/* Project Overview */}
      <section>
        <h1 className="mb-2 text-4xl font-bold">
          AI Text Processing Interface
        </h1>
        <p>
          Welcome to the AI Text Processing Interface! This application allows
          you to process text using Chrome&apos;s native AI APIs. You can detect
          the language of your text, translate it into various languages, or get
          an AI-generated summary of your content.
        </p>
      </section>

      {/* How to Use the App */}
      <section>
        <h2 className="mb-2 text-2xl font-semibold">How to Use the App</h2>
        <p className="mb-4 leading-[175%]">
          The interface is designed like a chat application. Your conversation
          will appear in the output area above, and you&apos;ll type your input
          in the text area at the bottom.
        </p>
        <ul className="ml-6 list-disc space-y-2 leading-[175%] text-gray-800 dark:text-gray-300">
          <li>
            <strong>Sending a Message:</strong> Type your text in the input
            field and click the either of the action buttons (&quot;
            <strong className="whitespace-nowrap text-primary-300 dark:text-primary-100">
              Summarize ✨
            </strong>
            &quot; or &quot;
            <strong className="text-primary-300 dark:text-primary-100">
              Translate
            </strong>
            ") or press Enter, to post your message in the chat.
          </li>
          <li>
            <strong>Language Detection:</strong> The app automatically detects
            the language of your input text and displays it beneath your
            message.
          </li>
          <li>
            <strong>Summarization:</strong> If your message is in English and
            contains more than 150 characters, a &quot;
            <strong className="whitespace-nowrap text-primary-300 dark:text-primary-100">
              Summarize ✨
            </strong>
            &quot; button will appear. Click this button to generate a summary
            using the AI Summarizer API.
          </li>
          <li>
            <strong>Translation:</strong> Use the language selector to choose a
            target language{" "}
            <strong>
              (English, French, Spanish, Portuguese, Russian, or Turkish)
            </strong>
            , then click the &quot;
            <strong className="text-primary-300 dark:text-primary-100">
              Translate
            </strong>
            &quot; button to convert the output text.
          </li>
        </ul>
      </section>

      {/* Navigation & Accessibility */}
      <section>
        <h2 className="mb-2 text-2xl font-semibold">
          Navigation & Accessibility
        </h2>
        <p>
          The app is fully responsive and keyboard-navigable. Use the tab key to
          move between the text input, buttons, and language selector.
          Accessible ARIA labels and clear focus indicators are provided to
          enhance usability.
        </p>
      </section>

      {/* Troubleshooting */}
      <section>
        <h2 className="mb-2 text-2xl font-semibold">Troubleshooting</h2>
        <p>
          If you encounter any errors (such as API failures or invalid input),
          you will see a clear error message via a toast notification. Please
          ensure that you are using a supported version of Chrome with
          experimental AI APIs enabled.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
