import React,{useState} from 'react'

export default function Faq() {
  const [questions, setQuestions] = useState([
    {
      question: "How can I track my order?",
      answer: "You can track your order by logging into your account and navigating to the 'Order History' section. There, you'll find detailed information about the status and location of your package."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods, including credit/debit cards, net banking, UPI, and cash on delivery (COD). You can choose the most convenient option during checkout."
    },
    {
      question: "What is your return policy?",
      answer: "We have a hassle-free return policy. If you're not satisfied with your purchase, you can initiate a return within [X] days of receiving the product. Please ensure the item is unused and in its original packaging for a smooth return process."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our dedicated customer support team via email at support@example.com or by calling our helpline at [Phone Number]. Our representatives are available [Hours of Operation] to assist you with any queries or concerns you may have regarding your shopping experience."
    }
  ])
  return (
    <section className="mx-auto max-w-7xl px-2 py-10 md:px-0">
      <div>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 lg:mx-auto">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, assumenda
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 md:mt-16 md:grid-cols-2">
          {questions.map((_, i) => (
            <div key={i}>
              <h2 className="text-xl font-semibold text-black">{_.question}</h2>
              <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
             {_.answer}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-gray-600">
          Can&apos;t find what you&apos;re looking for?{' '}
          <a href="#" title="" className="black font-semibold hover:underline">
            Contact us
          </a>
        </p>
      </div>
    </section>
  )
}
