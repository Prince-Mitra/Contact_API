import { Contact } from "../Models/Contact.js";

// create new contact
export const newContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  if (name == "" || email == "" || phone=="" || type == "") {
    return res.json({ message: "all fields are required", success: false });
  }

  let saveContact = await Contact.create({
    name,
    email,
    phone,
    type,
    user: req.user,
  });
  res.json({
    message: "contact successfully created",
    saveContact,
    success: true,
  });
};

// get all contact
export const getAllContact = async (req, res) => {
  const getContact = await Contact.find();
  if (!getContact) {
    return res.json({ message: "contacts not exists", success: false });
  }
  res.json({ message: "all contact fetched..", getContact, success: true });
};

// get contact by ID

export const getContactById = async (req, res) => {
  const id = req.params.id;
  const userContact = await Contact.findById(id);
  if (!userContact) {
    return res.json({ message: "contact is not exists", success: false });
  }
  res.json({ message: "contact fetched..", userContact, success: true });
};

// update contact

export const updateContact = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, type } = req.body;

  let updatedContact = await Contact.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      type,
    },
    { new: true }
  );
  if (!updatedContact) {
    return res.json({ message: "user does not exists", success: false });
  }

  res.json({
    message: "contact updated successfully...",
    updatedContact,
    success: true,
  });
};

//delete contact by id
export const deleteContactById = async (req, res) => {
  const id = req.params.id;
  let user = await Contact.findByIdAndDelete(id);
  if (!user) {
    return res.json({ message: "contact does not exists..", success: false });
  }
  res.json({ message: "contact successfully deleted...", success: true });
};

// get contact by userId
export const getContactByUserId = async(req,res)=>{
  const id = req.params.id;

  let user = await Contact.find({user:id});
  if(!user){
    return res.json({message:"user not exists..",success:false});
  }
  res.json({message:"user found",user,success:true});
}