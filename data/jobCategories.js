// data/jobCategories.js

export const jobCategories = [
    {
      id: "healthcare",
      name: "Υγεία",
      subCategories: [
        {
          id: "doctors",
          name: "Ιατροί",
          professions: [
            "Γενικός Ιατρός",
            "Παιδίατρος",
            "Καρδιολόγος",
            "Δερματολόγος",
            "Ψυχίατρος",
            "Νευρολόγος",
            "Ορθοπεδικός",
            "Γυναικολόγος"
          ]
        },
        {
          id: "dental",
          name: "Οδοντιατρική Φροντίδα",
          professions: [
            "Οδοντίατρος",
            "Ορθοδοντικός",
            "Περιοδοντολόγος",
            "Στοματικός Υγιεινολόγος"
          ]
        },
        {
          id: "allied-health",
          name: "Συναφή Επαγγέλματα Υγείας",
          professions: [
            "Φυσιοθεραπευτής",
            "Εργοθεραπευτής",
            "Λογοθεραπευτής",
            "Διατροφολόγος",
            "Διαιτολόγος"
          ]
        }
      ]
    },
    {
      id: "education",
      name: "Εκπαίδευση",
      subCategories: [
        {
          id: "academic",
          name: "Καθηγητές Ιδιαίτερων",
          professions: [
            "Καθηγητής Μαθηματικών",
            "Καθηγητής Φυσικής",
            "Καθηγητής Γλωσσών",
            "Καθηγητής Ιστορίας",
            "Καθηγητής Λογοτεχνίας"
          ]
        },
        {
          id: "skills",
          name: "Εκπαίδευση Δεξιοτήτων",
          professions: [
            "Δάσκαλος Μουσικής",
            "Δάσκαλος Τέχνης",
            "Δάσκαλος Χορού",
            "Προπονητής Αθλημάτων",
            "Εκπαιδευτής Προγραμματισμού"
          ]
        }
      ]
    },
    {
      id: "home-services",
      name: "Υπηρεσίες Σπιτιού",
      subCategories: [
        {
          id: "maintenance",
          name: "Συντήρηση Σπιτιού",
          professions: [
            "Υδραυλικός",
            "Ηλεκτρολόγος",
            "Ξυλουργός",
            "Τεχνικός Κλιματισμού",
            "Ελαιοχρωματιστής",
            "Τεχνικός Γενικών Εργασιών"
          ]
        },
        {
          id: "cleaning",
          name: "Υπηρεσίες Καθαρισμού",
          professions: [
            "Καθαριστής Σπιτιού",
            "Καθαριστής Τζαμιών",
            "Καθαριστής Χαλιών",
            "Καθαριστής Πισίνας"
          ]
        },
        {
          id: "outdoor",
          name: "Εξωτερικές Υπηρεσίες",
          professions: [
            "Κηπουρός",
            "Αρχιτέκτονας Τοπίου",
            "Απεντομωτής",
            "Ειδικός Φροντίδας Γκαζόν"
          ]
        }
      ]
    },
    {
      id: "beauty-wellness",
      name: "Ομορφιά & Ευεξία",
      subCategories: [
        {
          id: "beauty",
          name: "Υπηρεσίες Ομορφιάς",
          professions: [
            "Κομμωτής",
            "Μακιγιέρ",
            "Τεχνίτης Νυχιών",
            "Αισθητικός",
          ]
        },
        {
          id: "wellness",
          name: "Υπηρεσίες Ευεξίας",
          professions: [
            "Μασέρ",
            "Δάσκαλος Γιόγκα",
            "Προσωπικός Γυμναστής",
            "Εκπαιδευτής Διαλογισμού"
          ]
        }
      ]
    },
    {
      id: "professional-services",
      name: "Επαγγελματικές Υπηρεσίες",
      subCategories: [
        {
          id: "legal",
          name: "Νομικές Υπηρεσίες",
          professions: [
            "Δικηγόρος",
            "Συμβολαιογράφος",
            "Νομικός Σύμβουλος",
            "Δικαστικός Επιμελητής"
          ]
        },
        {
          id: "financial",
          name: "Οικονομικές Υπηρεσίες",
          professions: [
            "Λογιστής",
            "Οικονομικός Σύμβουλος",
            "Φοροτεχνικός",
            "Ασφαλιστικός Πράκτορας"
          ]
        },
        {
          id: "consulting",
          name: "Συμβουλευτική",
          professions: [
            "Σύμβουλος Επιχειρήσεων",
            "Σύμβουλος Καριέρας",
            "Σύμβουλος Ζωής",
            "Σύμβουλος Μάρκετινγκ"
          ]
        }
      ]
    },
    {
      id: "tech-services",
      name: "Υπηρεσίες Τεχνολογίας",
      subCategories: [
        {
          id: "computer",
          name: "Υπηρεσίες Υπολογιστών",
          professions: [
            "Τεχνικός Υπολογιστών",
            "Ειδικός Υποστήριξης IT",
            "Διαχειριστής Δικτύου",
            "Ειδικός Ανάκτησης Δεδομένων"
          ]
        },
        {
          id: "digital",
          name: "Ψηφιακές Υπηρεσίες",
          professions: [
            "Προγραμματιστής Ιστοσελίδων",
            "Προγραμματιστής Εφαρμογών",
            "Ειδικός SEO",
            "Ειδικός Ψηφιακού Μάρκετινγκ"
          ]
        }
      ]
    },
    {
      id: "events-entertainment",
      name: "Εκδηλώσεις & Ψυχαγωγία",
      subCategories: [
        {
          id: "event-services",
          name: "Υπηρεσίες Εκδηλώσεων",
          professions: [
            "Διοργανωτής Εκδηλώσεων",
            "Διοργανωτής Γάμων",
            "Διακοσμητής",
            "Υπηρεσίες Τροφοδοσίας"
          ]
        },
        {
          id: "entertainment",
          name: "Ψυχαγωγία",
          professions: [
            "Φωτογράφος",
            "Βιντεογράφος",
            "DJ",
            "Μουσικοί",
            "Ψυχαγωγός"
          ]
        }
      ]
    },
    {
      id: "automotive",
      name: "Αυτοκίνητο",
      subCategories: [
        {
          id: "repair",
          name: "Επισκευή & Συντήρηση",
          professions: [
            "Μηχανικός Αυτοκινήτων",
            "Ηλεκτρολόγος Αυτοκινήτων",
            "Ειδικός Καθαρισμού Αυτοκινήτων",
            "Ειδικός Ελαστικών"
          ]
        }
      ]
    },
    {
      id: "pet-services",
      name: "Υπηρεσίες για Κατοικίδια",
      subCategories: [
        {
          id: "pet-care",
          name: "Φροντίδα Κατοικιδίων",
          professions: [
            "Κτηνίατρος",
            "Περιποιητής Κατοικιδίων",
            "Εκπαιδευτής Σκύλων",
            "Φύλαξη Κατοικιδίων",
            "Περιπατητής Σκύλων"
          ]
        }
      ]
    }
  ];
  
  // Helper function to get all professions as a flat array
  export const getAllProfessions = () => {
    return jobCategories.flatMap(category => 
      category.subCategories.flatMap(subCategory => 
        subCategory.professions
      )
    );
  };
  
  // Helper function to get category by id
  export const getCategoryById = (categoryId) => {
    return jobCategories.find(category => category.id === categoryId);
  };
  
  // Helper function to get subcategory by id
  export const getSubCategoryById = (categoryId, subCategoryId) => {
    const category = getCategoryById(categoryId);
    return category?.subCategories.find(sub => sub.id === subCategoryId);
  };
  
  // Helper function to search professions
  export const searchProfessions = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return getAllProfessions().filter(profession => 
      profession.toLowerCase().includes(lowercaseQuery)
    );
  };