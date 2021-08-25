
const presetEvents = [


      {
          id: 1,
          event_name: "Opening Ceremony",
          speaker: "Eric Delgado",
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          location: "Lobby",
          start_time: new Date(2021, 4, 7, 17, 30).toISOString().replace('T', ' '),
          end_time: new Date(2021, 4, 7, 19, 0).toISOString().replace('T', ' '),
          start_col: 2,
          span: 12,
          color: "#A3F8A3" //green
      }, 
      {
          id: 2,
          event_name: "Meet and Greet",
          speaker: "Lila Tucker",
          summary: "Sed vulputate fermentum tellus viverra placerat. Donec vulputate tortor justo, ut congue urna pharetra vel.",
          location: "Conference Room A",
          start_time: new Date(2021, 4, 7, 19, 0).toISOString().replace('T', ' '),
          end_time: new Date(2021, 4, 7, 21, 0).toISOString().replace('T', ' '),
          start_col: 2,
          span: 6,
          color: "#A8EBF3" //blue

      },
      {
         id: 3,         
          event_name: "VIP Salon",
          speaker: "Lynn Lambert",
          summary: "Sed sit amet tempus libero.",
          location: "",
          start_time: new Date(2021, 4, 7, 19, 0).toISOString().replace('T', ' '),
          end_time: new Date(2021, 4, 7, 21, 0).toISOString().replace('T', ' '),
          start_col: 8,
          span: 6,
          color: "#F3B0A8" //pink
      },
      {
           id: 4,
            event_name: "Merchants",
            speaker: "",
            summary: "Curabitur ac egestas tortor",
            location: "Hotel Ballroom",
            start_time: new Date(2021, 4, 8, 9, 30).toISOString().replace('T', ' '),
            end_time: new Date(2021, 4, 8, 14, 30).toISOString().replace('T', ' '),
            
            start_col: 14,
            span: 6,
            color: "#A8EBF3" //blue
        },
        {
           id: 5,
            event_name: "Talk A",
            speaker: "Dr. Grace Clayton",
            summary: "",
            location: "Conference Room C",
            start_time: new Date(2021, 4, 8, 10, 0).toISOString().replace('T', ' '),
            end_time: new Date(2021, 4, 8, 11, 30).toISOString().replace('T', ' '),
            
            start_col: 20,
            span: 6,
            color: "#ffec6e" //yellow
        },
        {
           id: 6,
            event_name: "Food Trucks",
            speaker: "",
            summary: "",
            location: "Parking lot",
            start_time: new Date(2021, 4, 8, 11, 30).toISOString().replace('T', ' '),
            end_time: new Date(2021, 4, 8, 12, 30).toISOString().replace('T', ' '),
            
            start_col: 20,
            span: 6,
            color: "#ffdfba" //orange peach
        },
        {
            id: 7,
            event_name: "Talk B",
            speaker: "Dr. Jaime Wood",
            summary: "",
            location: "Conference Room B",
            start_time: new Date(2021, 4, 8, 12, 30).toISOString().replace('T', ' '),
            end_time: new Date(2021, 4, 8, 14, 0).toISOString().replace('T', ' '),
            
            start_col: 20,
            span: 6,
            color: "#ffec6e" //yellow
        }, 
        {
            id: 8,
            event_name: "Talk C",
            speaker: "Dr. Nathaniel Riley",
            summary: "",
            location: "Conference Room D",
            start_time: new Date(2021, 4, 8, 15, 0).toISOString().replace('T', ' '),
            end_time: new Date(2021, 4, 8, 17, 0).toISOString().replace('T', ' '),
            
            start_col: 14,
            span: 4,
            color: "#ffec6e" //yellow
        },
      
        {
            id: 9,
            event_name: "Talk D",
            speaker: "Dr. Daniel Parsons ",
            summary: "",
            location: "Conference Room C",
            start_time: new Date(2021, 4, 8, 15, 0).toISOString().replace('T', ' '),
            end_time: new Date(2021, 4, 8, 17, 0).toISOString().replace('T', ' '),
            
            start_col: 18,
            span: 4,
            color: "#ffec6e" //yellow
        },
        {
            id: 10,
            event_name: "Talk E",
            speaker: "Dr. Nicholas Carson",
            summary: "Etiam ut consequat orci.",
            location: "Conference Room A",
            start_time: new Date(2021, 4, 8, 16, 0).toISOString().replace('T', ' '),
            end_time: new Date(2021, 4, 8, 18, 0).toISOString().replace('T', ' '),
            
            start_col: 22,
            span: 4,
            color: "#ffec6e" //yellow
        },
        {
            id: 11,
            event_name: "Open Panel",
            speaker: "",
            summary: "",
            location: "Conference Room E",
            start_time: new Date(2021, 4, 8, 17, 0).toISOString().replace('T', ' '),
            end_time: new Date(2021, 4, 8, 18, 30).toISOString().replace('T', ' '),
            
            start_col: 14,
            span: 8,
            color: "#ffdfba" //orange peach
        },
        {
            id: 12,
            event_name: "Talk F",
            speaker: "Dr. Velma Morales",
            summary: "Nulla finibus ante eget libero congue congue.",
            location: "Conference Room D",
            start_time: new Date(2021, 4, 8, 19, 0).toISOString().replace('T', ' '),
            end_time: new Date(2021, 4, 8, 20, 30).toISOString().replace('T', ' '),
            
            start_col: 14,
            span: 6,
            color: "#ffec6e" //yellow
        },
        {
            id: 13,
            event_name: "Open Bar",
            speaker: "",
            summary: "",
            location: "Joe's Bar and Grill",
            start_time: new Date(2021, 4, 8, 19, 0).toISOString().replace('T', ' '),
            end_time: new Date(2021, 4, 8, 21, 30).toISOString().replace('T', ' '),
            
            start_col: 20,
            span: 6,
            color: "#A8EBF3" //blue
        },
        {
            id: 14,
            event_name: "Merchants",
            speaker: "",
            summary: "Curabitur ac egestas tortor",
            location: "Hotel Ballroom",
            start_time: new Date(2021, 4, 9, 9, 30).toISOString().replace('T', ' '),
            end_time: new Date(2021, 4, 9, 15, 0).toISOString().replace('T', ' '),
            
            start_col: 26,
            span: 6,
            color: "#A8EBF3" //blue
        },
        {
            id: 15,
            event_name: "Food Trucks",
            speaker: "",
            summary: "",
            location: "Parking lot",
            start_time: new Date(2021, 4, 9, 11, 30).toISOString().replace('T', ' '),
            end_time: new Date(2021, 4, 9, 12, 30).toISOString().replace('T', ' '),
            
            start_col: 32,
            span: 6,
            color: "#ffdfba" //orange peach
        },
        {
            id: 16,
            event_name: "Presentations, Group 1",
            speaker: "Dorothy Rose, Joyce Adkins, and Willie Rodgers",
            summary: "",
            location: "",
            start_time: new Date(2021, 4, 9, 15, 0).toISOString().replace('T', ' '),
            end_time: new Date(2021, 4, 9, 16, 30).toISOString().replace('T', ' '),
            
            start_col: 26,
            span: 6,
            color: "#F3B0A8" //pink
        },
        {
            id: 17,
            event_name: "Presentations, Group 2",
            speaker: "Cary Ballard, Dr. Allison Hanson, and Josh Flores",
            summary: "",
            location: "",
            start_time: new Date(2021, 4, 9, 15, 0).toISOString().replace('T', ' '),
            end_time: new Date(2021, 4, 9, 16, 30).toISOString().replace('T', ' '),
            
            start_col: 32,
            span: 6,
            color: "#F3B0A8" //pink
        },
        {
            id: 18,
            event_name: "Presentations, Group 3",
            speaker: "Jeanette Jordan, Dr. Sherry Buchanan, and Dr. Lowell Fowler ",
            summary: "",
            location: "",
            start_time: new Date(2021, 4, 9, 16, 30).toISOString().replace('T', ' '),
            end_time: new Date(2021, 4, 9, 18, 0).toISOString().replace('T', ' '),
            
            start_col: 32,
            span: 6,
            color: "#F3B0A8" //pink
        },
        {
            id: 19,
            event_name: "Talk",
            speaker: "Anna Ramsey",
            summary: "",
            location: "Conference Room C",
            start_time: new Date(2021, 4, 9, 16, 30).toISOString().replace('T', ' '),
            end_time: new Date(2021, 4, 9, 17, 30).toISOString().replace('T', ' '),
            
            start_col: 26,
            span: 6,
            color: "#ffec6e" //yellow
        },
        {
            id: 20,
            event_name: "Open Panel",
            speaker: "Dr. Velma Morales, Eric Delgado, Dr. Grace Clayton, and Jeanette Jordan",
            summary: "",
            location: "Conference Room D",
            start_time: new Date(2021, 4, 9, 17, 30).toISOString().replace('T', ' '),
            end_time: new Date(2021, 4, 9, 19, 0).toISOString().replace('T', ' '),
            
            start_col: 26,
            span: 6,
            color: "#ffdfba" //orange peach
        },
        {
            id: 21,
            event_name: "Talk",
            speaker: "Albert Joseph",
            summary: "",
            location: "Conference Room F",
            start_time: new Date(2021, 4, 9, 18, 0 ).toISOString().replace('T', ' '),
            end_time: new Date(2021, 4, 9, 19, 0).toISOString().replace('T', ' '),
            
            start_col: 32,
            span: 6,
            color: "#ffec6e" //yellow
        },
        {
            id: 22,
            event_name: "Awards",
            speaker: "",
            summary: "",
            location: "Hotel Lobby",
            start_time: new Date(2021, 4, 9, 19, 0),
            end_time: new Date(2021, 4, 9, 21, 0),
            
            start_col: 26,
            span: 12,
            color: "#A3F8A3" //green
        }

    ];



export default presetEvents;