import GoBackBtn from "@/components/GoBackBtn"

const page = () => {
  return (
    <div>
        <GoBackBtn/>
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-800 to-blue-600 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 mt-10">
            <h1 className="text-4xl font-bold mb-4 text-center animate-fade-in">Privacy Policy</h1>
            <p className="mb-6 text-lg text-center">Your privacy is important to us at Code-Canva. This policy outlines how we handle your data.</p>
            <h2 className="text-2xl font-semibold mb-2 animate-slide-in-left">What We Collect</h2>
            <ul className="list-disc list-inside space-y-4">
                <li className="animate-fade-in">Basic account information (e.g., email address).</li>
                <li className="animate-fade-in delay-100">Code snippets saved by the user.</li>
                <li className="animate-fade-in delay-200">Usage data for improving our services.</li>
            </ul>
            <h2 className="text-2xl font-semibold mt-6 mb-2 animate-slide-in-left">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-4">
                <li className="animate-fade-in">To provide a seamless coding experience.</li>
                <li className="animate-fade-in delay-100">To improve and personalize our platform.</li>
                <li className="animate-fade-in delay-200">To communicate important updates.</li>
            </ul>
            <p className="mt-6 text-center animate-slide-in-right">If you have any concerns, contact us at <a href="mailto:mrkaran2k5@gmail.com" className="text-blue-400 underline">privacy@karan-codeCanva.com</a>.</p>
        </div>
        </div>

  )
}

export default page
