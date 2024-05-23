import { profile1, profile2, profile3, profile4 } from "../assets/images";
import { call, message, hour } from "../assets/icons";

export const Testimonils = [
    {
        imageUrl: profile1,
        index: 1,
        heading: "Apurba Paul",
        text: "This app provides excellent support. My queries were resolved promptly, and the team was very professional and courteous. They went above and beyond to ensure I was satisfied with the resolution. I highly recommend their services to anyone in need of reliable support."
    },
    {
        imageUrl: profile2,
        index: 2,
        heading: "Arnab Chakraborty",
        text: "I am very impressed with the 24x7 availability. The team is always there to help, regardless of the time of day. Their commitment to customer service is evident, and I have never felt more supported. They provide timely and effective solutions to all my issues."
    },
    {
        imageUrl: profile3,
        index: 3,
        heading: "Subhadip Hazra",
        text: "Quick and efficient service! The app keeps me updated on my queries via email. I appreciate the transparency and the regular updates I receive. The user-friendly interface makes it easy to track the status of my queries. Their support has been invaluable."
    },
    {
        imageUrl: profile4,
        index: 4,
        heading: "Tomojit Chakraborty",
        text: "Fantastic experience! I can track my query updates in real-time, which gives me peace of mind. The app's real-time notification system ensures I am always informed. The support team is knowledgeable and responsive, making my experience seamless and stress-free."
    }
];

export const Help = [
    {
        title: "Submit Your Query:",
        icon: call,
        iconBg: "#accbe1",
        points: [
            "Users can easily submit their queries through the app at any time.",
            "Receive an acknowledgment email immediately after submitting your query.",
            "Track the progress of your query submission directly from the app dashboard."
        ]
    },
    {
        title: "Real-Time Updates:",
        icon: message,
        iconBg: "#accbe1",
        points: [
            "Stay informed with real-time updates on your query status via email.",
            "Get notified instantly about any changes or responses to your query.",
            "Opt-in for SMS notifications for additional real-time updates."
        ]
    },
    {
        title: "24x7 Support:",
        icon: hour,
        iconBg: "#accbe1",
        points: [
            "Our support team is available 24x7 to assist you with any issues.",
            "Access a comprehensive FAQ section for quick solutions to common queries.",
            "Engage in live chat with our support agents for immediate assistance."
        ]
    }
];


export const admin = [
    {
        index:1,
        adminEmail: "subhadip03031996@gmail.com"
    },
    {
        index:2,
        adminEmail: "subhadiphazra129@gmail.com"
    }
]