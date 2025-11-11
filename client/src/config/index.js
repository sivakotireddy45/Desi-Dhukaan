// 📋 Register & Login Forms
export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

// 🛒 Add Product Form (DesiDukaan categories and brands)
export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "vegetables", label: "Vegetables" },
      { id: "fruits", label: "Fruits" },
      { id: "dals", label: "Dals" },
      { id: "soaps", label: "Soaps" },
      { id: "shampoos", label: "Shampoos" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "patanjali", label: "Patanjali" },
      { id: "dove", label: "Dove" },
      { id: "fortune", label: "Fortune" },
      { id: "amul", label: "Amul" },
      { id: "parle", label: "Parle" },
      { id: "surf_excel", label: "Surf Excel" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

// 🧾 Header Menu Items
export const shoppingViewHeaderMenuItems = [
  { id: "home", label: "Home", path: "/shop/home" },
  { id: "products", label: "Products", path: "/shop/listing" },
  { id: "vegetables", label: "Vegetables", path: "/shop/listing" },
  { id: "fruits", label: "Fruits", path: "/shop/listing" },
  { id: "dals", label: "Dals", path: "/shop/listing" },
  { id: "soaps", label: "Soaps", path: "/shop/listing" },
  { id: "shampoos", label: "Shampoos", path: "/shop/listing" },
  { id: "search", label: "Search", path: "/shop/search" },
];

// 🔁 Category & Brand Maps
export const categoryOptionsMap = {
  vegetables: "Vegetables",
  fruits: "Fruits",
  dals: "Dals",
  soaps: "Soaps",
  shampoos: "Shampoos",
};

export const brandOptionsMap = {
  patanjali: "Patanjali",
  dove: "Dove",
  fortune: "Fortune",
  amul: "Amul",
  parle: "Parle",
  surf_excel: "Surf Excel",
};

// 🔍 Filter & Sort Options
export const filterOptions = {
  category: [
    { id: "vegetables", label: "Vegetables" },
    { id: "fruits", label: "Fruits" },
    { id: "dals", label: "Dals" },
    { id: "soaps", label: "Soaps" },
    { id: "shampoos", label: "Shampoos" },
  ],
  brand: [
    { id: "patanjali", label: "Patanjali" },
    { id: "dove", label: "Dove" },
    { id: "fortune", label: "Fortune" },
    { id: "amul", label: "Amul" },
    { id: "parle", label: "Parle" },
    { id: "surf_excel", label: "Surf Excel" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

// 🏠 Address Form
export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
