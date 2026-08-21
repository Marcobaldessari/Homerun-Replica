// Mock "My jobs" data for the Consumer Dashboard prototype.
// statusId mirrors the real job_status_id enum from the product glossary:
// 1 NotFinished, 2 ReceivingQuotes, 3 QuoteReceived, 4 AppointmentSet, 5 JobOccurred,
// 8 Reviewed, 9 Cancelled, 10 NoQuoteReceived, 11 PleaseSelectQuote, 12 QuoteReceivedButNoSelected
export type JobStatusId = 1 | 2 | 3 | 4 | 5 | 8 | 9 | 10 | 11 | 12;

export interface Quote {
  id: string;
  proName: string;
  avatarUrl: string;
  rating: number;
  reviewCount: number;
  priceLabel: string;
  message: string;
}

export interface JobAnswer {
  question: string;
  answer: string;
}

export interface Job {
  id: string;
  serviceName: string;
  createdDateLabel: string;
  statusId: JobStatusId;
  statusLabel: string;
  dateTimeLabel: string;
  location: string;
  contactPreferenceLabel: string;
  answers: JobAnswer[];
  description: string;
  requestNumber: string;
  quotes: Quote[];
  hiredQuoteId?: string;
}

export const ACTIVE_STATUS_IDS: JobStatusId[] = [1, 2, 3, 4];
export const OLD_STATUS_IDS: JobStatusId[] = [5, 8, 9, 10, 11, 12];

export const jobs: Job[] = [
  {
    id: "job-1",
    serviceName: "Sofa Moving",
    createdDateLabel: "22 March 2024",
    statusId: 2,
    statusLabel:
      "Quotes are on the way! We'll let you know when a quote is received.",
    dateTimeLabel: "Wednesday, 22 March 2024 - 09:00",
    location: "Woodside Ward, Haringey, London",
    contactPreferenceLabel: "They can call and see my number",
    answers: [
      { question: "What type of sofa?", answer: "Two seater" },
      { question: "Pick up floor?", answer: "Basement" },
      { question: "Delivery floor?", answer: "Basement" },
      {
        question: "Where is the sofa moving to (postcode)?",
        answer: "London / Haringey / Woodside Ward",
      },
    ],
    description:
      "The sofa is quite heavy and needs two people to carry it down a narrow staircase. Please bring furniture straps if possible.",
    requestNumber: "21121708",
    quotes: [],
  },
  {
    id: "job-2",
    serviceName: "Moving",
    createdDateLabel: "18 March 2024",
    statusId: 3,
    statusLabel:
      "You've received quotes! Take a look and choose your favorite pro.",
    dateTimeLabel: "Friday, 22 March 2024 - 14:00",
    location: "Hyde Park Ward, City of Westminster, London",
    contactPreferenceLabel: "They can call and see my number",
    answers: [
      { question: "How big is your move?", answer: "2 bedroom flat" },
      { question: "Do you need help with packing?", answer: "Yes" },
      {
        question: "Will we use the stairs or a lift at the loading point?",
        answer: "Lift",
      },
      { question: "How about at the location you are moving to?", answer: "Stairs" },
    ],
    description:
      "Moving from a 3rd floor flat with a working lift to a 2nd floor flat with no lift. A few boxes of books, so extra care appreciated.",
    requestNumber: "21121655",
    quotes: [
      {
        id: "quote-1",
        proName: "Tizia Biondi",
        avatarUrl: "/avatars/TiziaBiondi.png",
        rating: 4.6,
        reviewCount: 32,
        priceLabel: "69 TL",
        message: "Hello, the full quote is written above, let me know!",
      },
      {
        id: "quote-2",
        proName: "Fabio Barletta",
        avatarUrl: "/avatars/FabioBarletta.png",
        rating: 2.4,
        reviewCount: 9,
        priceLabel: "170 TL",
        message: "I can come to your house this weekend.",
      },
      {
        id: "quote-3",
        proName: "Mario Ballante",
        avatarUrl: "/avatars/MarioBallante.png",
        rating: 3.2,
        reviewCount: 12,
        priceLabel: "80 TL",
        message: "The quote is made based on your description.",
      },
    ],
  },
  {
    id: "job-3",
    serviceName: "House Painting",
    createdDateLabel: "20 March 2024",
    statusId: 10,
    statusLabel: "No quote received",
    dateTimeLabel: "Wednesday, 20 March 2024 - 11:00",
    location: "Soho, City of Westminster, London",
    contactPreferenceLabel: "I don't want to be called, send quotes via message",
    answers: [
      {
        question: "What type of painting project do you need done?",
        answer: "Interior walls",
      },
      { question: "Should the ceiling be painted?", answer: "No" },
    ],
    description:
      "Two bedrooms and a hallway, walls only, no ceiling. Would like it done before the end of the month.",
    requestNumber: "21120933",
    quotes: [],
  },
  {
    id: "job-4",
    serviceName: "Fridge Movers",
    createdDateLabel: "10 March 2024",
    statusId: 9,
    statusLabel: "Cancelled",
    dateTimeLabel: "Sunday, 10 March 2024 - 10:00",
    location: "Islington, London",
    contactPreferenceLabel: "They can call and see my number",
    answers: [
      { question: "What type of fridge are you moving?", answer: "American style" },
      { question: "Fridge brand/model?", answer: "Samsung" },
    ],
    description: "Found a mover outside the platform, cancelling this request.",
    requestNumber: "21119887",
    quotes: [],
  },
  {
    id: "job-5",
    serviceName: "Bed Assembly",
    createdDateLabel: "1 March 2024",
    statusId: 8,
    statusLabel: "Reviewed",
    dateTimeLabel: "Friday, 1 March 2024 - 16:00",
    location: "Camden Town, London",
    contactPreferenceLabel: "They can call and see my number",
    answers: [{ question: "What type of bed?", answer: "King size, flat pack" }],
    description: "Standard flat-pack king bed assembly, tools provided by the pro.",
    requestNumber: "21118512",
    quotes: [
      {
        id: "quote-4",
        proName: "Michael Carter",
        avatarUrl: "/avatars/MichaelCarter.png",
        rating: 4.9,
        reviewCount: 58,
        priceLabel: "45 TL",
        message: "Job's done, thanks for having me over!",
      },
    ],
    hiredQuoteId: "quote-4",
  },
];

export const getJobById = (id: string): Job | undefined =>
  jobs.find((job) => job.id === id);

export const getQuoteById = (job: Job, quoteId: string): Quote | undefined =>
  job.quotes.find((quote) => quote.id === quoteId);
