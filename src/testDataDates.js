let testData = {

    settings: { 
        dayNum: 3,
        hourNum: 13,
        startHour: 9,
        startDate: new Date(2021, 4, 7),
        startDate2: 7,
        days: ["Fri", "Sat", "Sun"]
    },

    events: [
        {
            name: "Opening Ceremony",
            speaker: "Eric Delgado",
            summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            location: "Lobby",
            startTime: new Date(2021, 4, 7, 17, 30),
            endTime: new Date(2021, 4, 7, 19, 0),
            day: 1,
            startCol: 2,
            span: 12,
            color: "#A3F8A3" //green

            //Month
            //Day
            //start_hour
            //start_minute
            //end_hour
            //end_minute
        }, 
        {
            name: "Meet and Greet",
            speaker: "Lila Tucker",
            summary: "Sed vulputate fermentum tellus viverra placerat. Donec vulputate tortor justo, ut congue urna pharetra vel.",
            location: "Conference Room A",
            startTime: new Date(2021, 4, 7, 19, 0),
            endTime: new Date(2021, 4, 7, 21, 0),
            day: 1,
            startCol: 2,
            span: 6,
            color: "#A8EBF3" //blue


        },
        {
            name: "VIP Salon",
            speaker: "Lynn Lambert",
            summary: "Sed sit amet tempus libero.",
            location: "",
            startTime: new Date(2021, 4, 7, 19, 0),
            endTime: new Date(2021, 4, 7, 21, 0),
            day: 1,
            startCol: 8,
            span: 6,
            color: "#F3B0A8" //pink
        },
     
        {
            name: "Merchants",
            speaker: "",
            summary: "Curabitur ac egestas tortor",
            location: "Hotel Ballroom",
            startTime: new Date(2021, 4, 8, 9, 30),
            endTime: new Date(2021, 4, 8, 15, 0),
            day: 2,
            startCol: 14,
            span: 6,
            color: "#A8EBF3" //blue
        },
        {
            name: "Talk",
            speaker: "Dr. Grace Clayton",
            summary: "",
            location: "Conference Room C",
            startTime: new Date(2021, 4, 8, 10, 0),
            endTime: new Date(2021, 4, 8, 11, 30),
            day: 2,
            startCol: 20,
            span: 6,
            color: "#ffec6e" //yellow
        },
        {
            name: "Food Trucks",
            speaker: "",
            summary: "",
            location: "Parking lot",
            startTime: new Date(2021, 4, 8, 11, 30),
            endTime: new Date(2021, 4, 8, 12, 30),
            day: 2,
            startCol: 20,
            span: 6,
            color: "#B0E5B2" //pale green
        },
        {
            name: "Talk",
            speaker: "Dr. Jaime Wood",
            summary: "",
            location: "Conference Room B",
            startTime: new Date(2021, 4, 8, 12, 30),
            endTime: new Date(2021, 4, 8, 14, 0),
            day: 2,
            startCol: 20,
            span: 6,
            color: "#ffec6e" //yellow
        }, 
        {
            name: "Talk",
            speaker: "Dr. Nathaniel Riley",
            summary: "",
            location: "Conference Room D",
            startTime: new Date(2021, 4, 8, 15, 0),
            endTime: new Date(2021, 4, 8, 17, 0),
            day: 2,
            startCol: 14,
            span: 4,
            color: "#ffec6e" //yellow
        },
      
        {
            name: "Talk",
            speaker: "Dr. Daniel Parsons ",
            summary: "",
            location: "Conference Room C",
            startTime: new Date(2021, 4, 8, 15, 0),
            endTime: new Date(2021, 4, 8, 17, 0),
            day: 2,
            startCol: 18,
            span: 4,
            color: "#ffec6e" //yellow
        },
        {
            name: "Talk",
            speaker: "Dr. Nicholas Carson",
            summary: "Etiam ut consequat orci.",
            location: "Conference Room A",
            startTime: new Date(2021, 4, 8, 16, 0),
            endTime: new Date(2021, 4, 8, 18, 0),
            day: 2,
            startCol: 22,
            span: 4,
            color: "#ffec6e" //yellow
        },
        {
            name: "Open Panel",
            speaker: "",
            summary: "",
            location: "Conference Room E",
            startTime: new Date(2021, 4, 8, 17, 0),
            endTime: new Date(2021, 4, 8, 18, 30),
            day: 2,
            startCol: 14,
            span: 8,
            color: "#B0E5B2" //pale green
        },
        {
            name: "Talk",
            speaker: "Dr. Velma Morales",
            summary: "Nulla finibus ante eget libero congue congue.",
            location: "Conference Room D",
            startTime: new Date(2021, 4, 8, 19, 0),
            endTime: new Date(2021, 4, 8, 20, 30),
            day: 2,
            startCol: 14,
            span: 6,
            color: "#ffec6e" //yellow
        },
        {
            name: "Open Bar",
            speaker: "",
            summary: "",
            location: "Joe's Bar and Grill",
            startTime: new Date(2021, 4, 8, 19, 0),
            endTime: new Date(2021, 4, 8, 21, 30),
            day: 2,
            startCol: 20,
            span: 6,
            color: "#A8EBF3" //blue
        },
        {
            name: "Merchants",
            speaker: "",
            summary: "Curabitur ac egestas tortor",
            location: "Hotel Ballroom",
            startTime: new Date(2021, 4, 9, 9, 30),
            endTime: new Date(2021, 4, 9, 15, 0),
            day: 3,
            startCol: 26,
            span: 6,
            color: "#A8EBF3" //blue
        },
        {
            name: "Food Trucks",
            speaker: "",
            summary: "",
            location: "Parking lot",
            startTime: new Date(2021, 4, 9, 11, 30),
            endTime: new Date(2021, 4, 9, 12, 30),
            day: 3,
            startCol: 32,
            span: 6,
            color: "#B0E5B2" //pale green
        },
        {
            name: "Presentations, Group 1",
            speaker: "Dorothy Rose, Joyce Adkins, and Willie Rodgers",
            summary: "",
            location: "",
            startTime: new Date(2021, 4, 9, 15, 0),
            endTime: new Date(2021, 4, 9, 16, 30),
            day: 3,
            startCol: 26,
            span: 6,
            color: "#F3B0A8" //pink
        },
        {
            name: "Presentations, Group 2",
            speaker: "Cary Ballard, Dr. Allison Hanson, and Josh Flores",
            summary: "",
            location: "",
            startTime: new Date(2021, 4, 9, 15, 0),
            endTime: new Date(2021, 4, 9, 16, 30),
            day: 3,
            startCol: 32,
            span: 6,
            color: "#F3B0A8" //pink
        },
        {
            name: "Presentations, Group 3",
            speaker: "Jeanette Jordan, Dr. Sherry Buchanan, and Dr. Lowell Fowler ",
            summary: "",
            location: "",
            startTime: new Date(2021, 4, 9, 16, 30),
            endTime: new Date(2021, 4, 9, 18, 0),
            day: 3,
            startCol: 32,
            span: 6,
            color: "#F3B0A8" //pink
        },
        {
            name: "Talk",
            speaker: "Anna Ramsey",
            summary: "",
            location: "Conference Room C",
            startTime: new Date(2021, 4, 9, 16, 30),
            endTime: new Date(2021, 4, 9, 17, 30),
            day: 3,
            startCol: 26,
            span: 6,
            color: "#ffec6e" //yellow
        },
        {
            name: "Open Panel",
            speaker: "Dr. Velma Morales, Eric Delgado, Dr. Grace Clayton, and Jeanette Jordan",
            summary: "",
            location: "Conference Room D",
            startTime: new Date(2021, 4, 9, 17, 30),
            endTime: new Date(2021, 4, 9, 19, 0),
            day: 3,
            startCol: 26,
            span: 6,
            color: "#B0E5B2" //pale green
        },
        {
            name: "Talk",
            speaker: "Albert Joseph",
            summary: "",
            location: "Conference Room F",
            startTime: new Date(2021, 4, 9, 18, ),
            endTime: new Date(2021, 4, 9, 19, 0),
            day: 3,
            startCol: 32,
            span: 6,
            color: "#ffec6e" //yellow
        },
        {
            name: "Awards",
            speaker: "",
            summary: "",
            location: "Hotel Lobby",
            startTime: new Date(2021, 4, 9, 19, 0),
            endTime: new Date(2021, 4, 9, 21, 0),
            day: 3,
            startCol: 26,
            span: 12,
            color: "#A3F8A3" //green
        },

    ]

};

export default testData;
   