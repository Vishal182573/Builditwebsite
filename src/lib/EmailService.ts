import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEnquiryNotification = async (enquiryData: any) => {
  const { type, name, email, phone, area, location, budget, interiorTypes } =
    enquiryData;

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL as string,
      to: process.env.ADMIN_EMAIL as string,
      subject: "New Enquiry Submission",
      html: `
        <h1>New Enquiry Received</h1>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Area:</strong> ${area} sqft</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        ${
          type === "interior"
            ? `<p><strong>Interior Types:</strong> ${interiorTypes.join(
                ", "
              )}</p>`
            : ""
        }
      `,
    });

    if (error) {
      console.error("Detailed Resend error:", JSON.stringify(error, null, 2));
      throw error;
    }

    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error("Detailed error in sendEnquiryNotification:", error);
    throw error;
  }
};

