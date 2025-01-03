export const initialState = {
  auth: {
    userData: {
      id: null,
      name: null,
      email: null,
      phone_number: null,
      avatar_url: null,
      company_name: null,
      company_logo: null,
      company_addresses: [],
      language: null,
      currency: null,
      time_zone: null,
      first_page: null,
      country: null,
      city: null,
      address: null,
      post_index: null,
      balance: null,
      services: [],
      selectedServiceId: 1,
      tariff: {
        isActive: false,
        tariffName: "Demo",
        amountDue: null,
        camsNumber: null,
        dueDate: null,
      },
      session_id: null,
      role: null,
    },
    apiKey: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
    error: null,
  },

  cars: {
    car: {
      id: null,
      status: null,
      photo: null,
      plate: null,
      checkInTime: null,
      makeModel: null,
      vin: null,
      engine: null,
      records: null,
      liftTime: null,
      year: null,
      mileage: null,
      brandPhoto: null,
      modelPhoto: null,
    },
    current: [],
    day: [],
    month: [],
    all: [],
    newCars: [],
    periodCars: [],
    forHours: {},
    monthlyLoad: {},
    date: new Date().toISOString().substring(0, 10),
    isLoading: false,
    error: null,
    loadPercent: null,
    queryMonth: null,
    workHours: {},
    isLoadingForCalendar: false,
    isLoadingCarsByDay: false,
  },

  crm: {
    serviceData: {
      mechanics: [],
      posts: [],
      services: [],
      workingHours: [],
      availability: [],
    },
    records: [],
    dayRecords: [],
    periodRecords: [],
    dates: {
      startDate: null,
      endDate: null,
    },
    visits: [],
    load: [],
    isLoading: false,
    error: null,
  },

  clients: {
    clientInfo: {
      client: {
        id: null,
        name: null,
        phone: null,
        email: null,
        address: null,
        rating: null,
        status: null,
        date_of_birth: null,
        registration_date: null,
        last_visit: null,
        total_spent: 0,
        preferred_contact_method: null,
        notes: null,
        loyalty_program_status: null,
        number_of_visits: null,
        service_package: null,
        discount_type: null,
        emergency_service: null,
        next_service_date: null,
        source_of_contact: null,
        warranty_cases: null,
        special_offers: null,
        referral_count: null,
        discount_card_number: null,
        accumulated_bonus: null,
        related_customer_id: null,
        company_id: null,
      },
      car: {
        plate: null,
        year: null,
        vin: null,
        service_book: null,
      },
      service_history: [],
      isLoading: false,
      error: null,
    },
  },

  service: {
    data: {
      name: null,
      logo: null,
      address: null,
      userCode: null,
      account: null,
      bank: null,
      bankDetails: null,
      legalAddress: null,
      managerPhone: null,
      managerName: null,
      officePhoneNumber: null,
      headPhoneNumber: null,
    },
    isLoading: false,
    error: null,
  },

  settings: {
    schedule: [],
    posts: [],
    prices: [],
    isLoading: false,
    error: null,
  },

  warehouse: {
    warehouses: [],
    // sections: [],
    // racks: [],
    // shelves: [],
    // places: [],
    prompts: [],
    isLoading: false,
    error: null,
  },

  archive: {
    archiveData: [],
    reasons: [
      {
        id: 1,
        name: "duplicate",
      },
      {
        id: 2,
        name: "employee",
      },
      {
        id: 3,
        name: "random",
      },
      {
        id: 4,
        name: "refusal",
      },
      {
        id: 5,
        name: "did_not_visit",
      },
      {
        id: 6,
        name: "rating",
      },
      {
        id: 7,
        name: "did_not_help",
      },
    ],
    isLoading: false,
    error: null,
  },
};
