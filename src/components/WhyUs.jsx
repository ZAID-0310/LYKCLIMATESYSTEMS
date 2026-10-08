import { reasons } from "@/data/content";

export default function WhyUs() {
  return (
    <section className="bg-soft py-16">
      <div className="mx-auto w-[92%] max-w-6xl">
        <h2 className="mb-10 text-center text-2xl font-bold uppercase text-navy">¿Por qué elegir FurgoTrans?</h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="flex items-start gap-3">
              <span className="text-3xl" aria-hidden="true">{r.icon}</span>
              <div>
                <h3 className="font-bold text-navy">{r.title}</h3>
                <p className="text-sm text-gray-600">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
