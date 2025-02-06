// data/greekAreas.js

export const greekAreas = [
    {
      id: "attiki",
      name: "Αττική",
      subAreas: [
        {
          id: "central-athens",
          name: "Κεντρική Αθήνα",
          areas: [
            "Αθήνα",
            "Ζωγράφου",
            "Καισαριανή",
            "Βύρωνας",
            "Παγκράτι",
            "Γουδί",
            "Αμπελόκηποι",
            "Κυψέλη",
            "Εξάρχεια",
            "Κολωνάκι"
          ]
        },
        {
          id: "north-athens",
          name: "Βόρεια Προάστια",
          areas: [
            "Χαλάνδρι",
            "Μαρούσι",
            "Κηφισιά",
            "Νέα Ερυθραία",
            "Νέα Ιωνία",
            "Ηράκλειο",
            "Μεταμόρφωση",
            "Πεύκη",
            "Λυκόβρυση",
            "Βριλήσσια",
            "Αγία Παρασκευή",
            "Χολαργός",
            "Παπάγου",
            "Ψυχικό",
            "Φιλοθέη",
            "Νέο Ψυχικό"
          ]
        },
        {
          id: "south-athens",
          name: "Νότια Προάστια",
          areas: [
            "Γλυφάδα",
            "Βούλα",
            "Βουλιαγμένη",
            "Άλιμος",
            "Ελληνικό",
            "Αργυρούπολη",
            "Ηλιούπολη",
            "Νέα Σμύρνη",
            "Παλαιό Φάληρο",
            "Άγιος Δημήτριος",
            "Δάφνη",
            "Βάρη",
            "Βάρκιζα"
          ]
        },
        {
          id: "west-athens",
          name: "Δυτικά Προάστια",
          areas: [
            "Περιστέρι",
            "Αιγάλεω",
            "Χαϊδάρι",
            "Αγία Βαρβάρα",
            "Ίλιον",
            "Πετρούπολη",
            "Καματερό",
            "Αγίοι Ανάργυροι",
            "Νέα Φιλαδέλφεια",
            "Νέα Χαλκηδόνα"
          ]
        },
        {
          id: "piraeus",
          name: "Πειραιάς και Περίχωρα",
          areas: [
            "Πειραιάς",
            "Κερατσίνι",
            "Δραπετσώνα",
            "Νίκαια",
            "Κορυδαλλός",
            "Πέραμα",
            "Άγιος Ιωάννης Ρέντης",
            "Μοσχάτο",
            "Καλλιθέα",
            "Ταύρος"
          ]
        },
        {
          id: "east-attica",
          name: "Ανατολική Αττική",
          areas: [
            "Παλλήνη",
            "Γέρακας",
            "Γλυκά Νερά",
            "Παιανία",
            "Σπάτα",
            "Αρτέμιδα",
            "Ραφήνα",
            "Πικέρμι",
            "Νέα Μάκρη",
            "Μαραθώνας",
            "Διόνυσος",
            "Άνοιξη",
            "Δροσιά",
            "Κρυονέρι"
          ]
        }
      ]
    },
    {
      id: "thessaloniki",
      name: "Θεσσαλονίκη",
      subAreas: [
        {
          id: "central-thessaloniki",
          name: "Κέντρο Θεσσαλονίκης",
          areas: [
            "Κέντρο",
            "Λαδάδικα",
            "Ναυαρίνο",
            "Άνω Πόλη",
            "Ροτόντα",
            "Αγίας Σοφίας"
          ]
        },
        {
          id: "west-thessaloniki",
          name: "Δυτική Θεσσαλονίκη",
          areas: [
            "Εύοσμος",
            "Κορδελιό",
            "Μενεμένη",
            "Αμπελόκηποι",
            "Σταυρούπολη",
            "Πολίχνη",
            "Νεάπολη",
            "Συκιές"
          ]
        },
        {
          id: "east-thessaloniki",
          name: "Ανατολική Θεσσαλονίκη",
          areas: [
            "Καλαμαριά",
            "Πυλαία",
            "Τούμπα",
            "Χαριλάου",
            "Θέρμη",
            "Πανόραμα",
            "Καρδία",
            "Τριανδρία"
          ]
        }
      ]
    },
    {
      id: "patra",
      name: "Πάτρα",
      subAreas: [
        {
          id: "central-patra",
          name: "Κέντρο Πάτρας",
          areas: [
            "Κέντρο",
            "Ψηλά Αλώνια",
            "Άγιος Ανδρέας",
            "Τριών Ναυάρχων",
            "Μαρίνα"
          ]
        },
        {
          id: "suburbs-patra",
          name: "Περίχωρα Πάτρας",
          areas: [
            "Ρίο",
            "Καστελόκαμπος",
            "Αγυιά",
            "Εγλυκάδα",
            "Παραλία",
            "Οβρυά"
          ]
        }
      ]
    }
  ];
  
  // Helper function to get all areas as a flat array
  export const getAllAreas = () => {
    return greekAreas.flatMap(region => 
      region.subAreas.flatMap(subArea => 
        subArea.areas
      )
    );
  };
  
  // Helper function to get region by id
  export const getRegionById = (regionId) => {
    return greekAreas.find(region => region.id === regionId);
  };
  
  // Helper function to get subarea by id
  export const getSubAreaById = (regionId, subAreaId) => {
    const region = getRegionById(regionId);
    return region?.subAreas.find(sub => sub.id === subAreaId);
  };
  
  // Helper function to search areas
  export const searchAreas = (query) => {
    if (!query) return [];
    const lowercaseQuery = query.toLowerCase();
    let results = [];
  
    greekAreas.forEach(region => {
      // Search in region names
      if (region.name.toLowerCase().includes(lowercaseQuery)) {
        results.push({
          type: 'region',
          text: region.name
        });
      }
  
      region.subAreas.forEach(subArea => {
        // Search in subArea names
        if (subArea.name.toLowerCase().includes(lowercaseQuery)) {
          results.push({
            type: 'subArea',
            text: subArea.name,
            region: region.name
          });
        }
  
        // Search in area names
        subArea.areas.forEach(area => {
          if (area.toLowerCase().includes(lowercaseQuery)) {
            results.push({
              type: 'area',
              text: area,
              region: region.name,
              subArea: subArea.name
            });
          }
        });
      });
    });
  
    // Remove duplicates and limit results
    return results.slice(0, 8);
  };