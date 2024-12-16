import GoBackBtn from "@/components/GoBackBtn";

const SupportPage = () => {
  return (
    <div>
      <GoBackBtn />

      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-800 to-blue-600 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 mt-24">
        <h1 className="text-4xl font-bold mb-4 text-center animate-fade-in">
          Support
        </h1>
        <p className="mb-6 text-lg text-center">
          Welcome to the support page of Code-Canva! If you encounter any issues
          or have questions, we are here to help.
        </p>
        <h2 className="text-2xl font-semibold mb-2 animate-slide-in-left">
          Frequently Asked Questions
        </h2>
        <ul className="list-disc list-inside space-y-4">
          <li className="animate-fade-in">
            How do I save my code? - You can save your code by clicking the
            'Share' button in the toolbar.
          </li>
          <li className="animate-fade-in delay-100">
            What languages are supported? - Code-Canva supports JavaScript,
            Python, C++, and more.
          </li>
          <li className="animate-fade-in delay-200">
            How do I report a bug? - Email us at{" "}
            <a
              href="mailto:mrkaran2k5@gmail.com"
              className="text-blue-400 underline"
            >
              support@karan-codeCanva.com
            </a>
            .
          </li>
        </ul>
        <p className="mt-6 text-center animate-slide-in-right">
          If your issue isn't listed, feel free to reach out to our support
          team.
        </p>
      </div>
    </div>
  );
};

export default SupportPage;
