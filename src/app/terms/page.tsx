import GoBackBtn from "@/components/GoBackBtn"

const TermsPage = () => {
  return (
    <div>
        <GoBackBtn/>
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-800 to-blue-600 text-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 mt-10">
            <h1 className="text-4xl font-bold mb-4 text-center animate-fade-in">Terms of Service</h1>
            <p className="mb-6 text-lg text-center">Welcome to Code-Canva! By using our platform, you agree to the following terms:</p>
            <h2 className="text-2xl font-semibold mb-2 animate-slide-in-left">Usage Guidelines</h2>
            <ul className="list-disc list-inside space-y-4">
                <li className="animate-fade-in">Do not use Code-Canva for illegal activities.</li>
                <li className="animate-fade-in delay-100">Respect intellectual property rights when sharing code.</li>
                <li className="animate-fade-in delay-200">Ensure you have permission to use and upload any third-party libraries.</li>
            </ul>
            <h2 className="text-2xl font-semibold mt-6 mb-2 animate-slide-in-left">Liability</h2>
            <p className="mb-6 animate-fade-in">Code-Canva is not responsible for any loss of data or damages arising from the use of our platform.</p>
            <h2 className="text-2xl font-semibold mb-2 animate-slide-in-left">Changes</h2>
            <p className="animate-fade-in">We reserve the right to update these terms at any time. Users will be notified of major changes.</p>
            <p className="mt-6 text-center animate-slide-in-right">For any questions, contact us at <a href="mailto:mrkaran2k5@gmail.com" className="text-blue-400 underline">terms@karan-codeCanva.com</a>.</p>
        </div>
    </div>
  )
}

export default TermsPage
