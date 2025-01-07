---
title: 'Is Building Your Own Design System Worth It? Best Practices, Key Considerations and Real-World Example'
date: 2024-06-02T17:17:02+03:30
layout: single
author_profile: true
url: 2024/06/02/is-building-your-own-design-system-worth-it/
shortlink: https://g.omid.dev/v2aiPn3
tags:
  - Design Systems
  - Web Development
  - UI/UX Design
  - FrontEnd Development
  - JavaScript Frameworks
lang: en
categories: 
  - TechBlog
---
In the ever-evolving landscape of web development, the question of whether to build and develop your own design system is a common one. As design systems become more integral to creating cohesive, scalable, and efficient applications, it's crucial to weigh the benefits and challenges. This blog post delves into the worthiness of developing a custom design system, best practices for building one, when it's needed, and the role of JavaScript frameworks like Angular. Additionally, we'll explore which development teams should be involved in this process and provide a real-world example for clarity.

### Is Building Your Own Design System Worth It?

**Benefits:**

1. **Consistency:** A design system ensures a unified look and feel across all your applications, enhancing user experience. For instance, consider a company like Airbnb, which uses a design system called "Design Language System (DLS)." By employing DLS, Airbnb ensures that their branding and user interface elements are consistent across their web and mobile platforms.

2. **Efficiency:** With reusable components, development time is significantly reduced, allowing teams to focus on higher-level challenges. For example, if your design system includes a pre-built card component, developers can quickly implement it across different parts of your application without having to design and code each card from scratch.

3. **Scalability:** As your application grows, a design system allows for easier maintenance and updates. Shopify’s “Polaris” design system enables their team to update the visual style or behavior of components globally, ensuring that all parts of their platform stay current without individually updating each element.

4. **Collaboration:** A shared language between designers and developers improves communication and collaboration. For example, IBM’s “Carbon” design system provides detailed guidelines and documentation that help align the work of designers and developers, ensuring a seamless development process.

**Challenges:**

1. **Initial Investment:** Building a design system requires a significant upfront investment in time and resources. For instance, creating Salesforce’s “Lightning Design System” involved extensive research, design, and development efforts before it could be effectively implemented across their products.

2. **Maintenance:** Regular updates and maintenance are necessary to keep the design system relevant and useful. Google's “Material Design” is an example of a system that requires ongoing maintenance to adapt to new trends and technologies.

3. **Adoption:** Ensuring that all team members adhere to the design system can be challenging. Microsoft’s “Fluent Design System” includes comprehensive training and support to ensure widespread adoption and proper usage within their teams.

### Best Practices for Building a Design System

1. **Start Small:** Begin with the most critical components and gradually expand. Focus on buttons, forms, typography, and colors first. For instance, start by designing a button component with various states (default, hover, active, disabled) and then move on to more complex elements like navigation bars or modal dialogs.

2. **Documentation:** Comprehensive documentation is crucial. It should cover guidelines, usage instructions, and examples for each component. Atlassian’s “Atlaskit” includes extensive documentation that helps teams understand how to use each component and adhere to best practices.

3. **Collaboration:** Involve both designers and developers from the start. Regular feedback loops help refine the system. Tools like Figma for design and Storybook for development facilitate collaboration by allowing real-time feedback and component testing.

4. **Modular Design:** Build components to be modular and reusable. This approach promotes consistency and reduces redundancy. For example, an input field component should be designed to be used in various forms throughout the application, with configurable properties for validation, placeholder text, and styles.

5. **Scalability:** Design the system to be scalable. It should accommodate future growth and changes without significant overhauls. Pinterest’s “Gestalt” design system is built with scalability in mind, ensuring that new components and patterns can be added as needed.

6. **Tooling:** Utilize tools like Storybook for developing, testing, and displaying UI components in isolation. Storybook allows developers to build components in isolation and see how they interact with different inputs and states before integrating them into the main application.

7. **Testing:** Implement rigorous testing to ensure components work across different browsers and devices. Automated testing frameworks like Jest for unit tests and Cypress for end-to-end tests can help ensure that your components function correctly in all environments.

### When Is a Design System Needed?

1. **Large-Scale Projects:** For organizations with multiple applications or a large, complex application, a design system can streamline development. For example, IBM uses the Carbon Design System across its many products and services, ensuring consistency and efficiency.

2. **Frequent Updates:** If your application requires frequent updates, a design system ensures consistency and reduces redundancy. A company like Uber, which frequently updates its interface and adds new features, benefits greatly from a design system that ensures all changes are consistent and quickly implemented.

3. **Multiple Teams:** When multiple teams or departments are involved, a design system helps maintain a cohesive design language. Adobe’s Spectrum design system is used by various teams to ensure a unified experience across their suite of products.

4. **Brand Consistency:** For companies with a strong brand identity, a design system ensures that brand guidelines are adhered to across all digital products. Spotify’s design system, Encore, helps maintain brand consistency across all their platforms, from desktop to mobile apps.

### Does the JavaScript Framework Matter?

The JavaScript framework you use (e.g., Angular, React, Vue.js) can influence but not dictate the need for a design system. Each framework has its own set of tools and best practices for building and maintaining UI components. However, the core principles of a design system remain consistent across frameworks:

- **Component-Based Architecture:** Modern frameworks like Angular promote component-based architecture, aligning well with the principles of a design system. This architecture allows for the creation of self-contained, reusable components that can be easily managed and integrated. For example, Angular Material provides pre-built UI components that adhere to Google’s Material Design guidelines.

- **Reusable Components:** Frameworks facilitate the creation of reusable components, a cornerstone of any design system. React, for example, is known for its reusable component model, which fits perfectly with the concept of a design system.

- **State Management:** Frameworks often include state management tools, which can be integrated with design system components for better consistency and predictability. Vue.js with Vuex provides a centralized state management system that works well with reusable components.

While the specific tools and methodologies might vary, the overarching goal of a design system remains the same: to create a cohesive, efficient, and scalable design and development process.

### Teams Involved in Building a Design System

1. **Designers:** Responsible for creating the visual language, defining design principles, and ensuring the aesthetic consistency of the system. Designers play a crucial role in developing the initial design guidelines and continuously refining the system based on feedback and new requirements. For example, the design team at Shopify works closely with developers to create and maintain the Polaris design system.

2. **Front-End Developers:** Build and maintain the UI components, ensuring they are reusable, scalable, and performant. Developers translate design specifications into code, creating components that can be easily integrated into the application. At Airbnb, front-end developers work hand-in-hand with designers to implement the Design Language System (DLS).

3. **UX Researchers:** Provide insights into user behavior, ensuring that the design system meets user needs and enhances the user experience. By conducting user research and testing, UX researchers help identify pain points and opportunities for improvement. For example, UX researchers at IBM contribute to the ongoing development of the Carbon Design System.

4. **Product Managers:** Align the design system with business goals, ensuring it supports the overall product strategy. Product managers prioritize the development of components and features based on their impact on the business and user experience. At Microsoft, product managers help ensure that the Fluent Design System aligns with the company’s strategic objectives.

5. **QA Engineers:** Conduct thorough testing to ensure components work seamlessly across different browsers and devices. QA engineers develop and execute test plans, identify issues, and work with developers to resolve them. For example, QA engineers at Google rigorously test components in the Material Design system to ensure they meet high standards of quality.

6. **Content Strategists:** Ensure that the language and tone used in the components are consistent with the brand voice. Content strategists work closely with designers and developers to integrate content seamlessly into the design system. At Adobe, content strategists play a key role in maintaining the Spectrum design system’s consistency.

### Real-World Example: Airbnb's Design Language System (DLS)

Airbnb is a prime example of a company that has successfully implemented a design system to enhance its development process and user experience.

**The Challenge:**
Before the introduction of the Design Language System (DLS), Airbnb faced challenges with maintaining consistency across its various platforms. Different teams working on web and mobile applications often created their own components, leading to a fragmented user experience and inefficient development processes.

**The Solution:**
Airbnb developed the Design Language System (DLS) to address these challenges. DLS provides a comprehensive set of design principles, patterns, and components that ensure a cohesive user experience across all platforms.

**Key Components:**

1. **Typography and Color Palette:** DLS defines a consistent typography and color scheme, ensuring that all text and UI elements adhere to Airbnb’s brand guidelines.
2. **Reusable Components:** From buttons and input fields to more complex elements like date pickers and modal dialogs, DLS includes a library of reusable components that can be easily integrated into any project.
3. **Design Tokens:** These are the foundational values for color, spacing, typography, and other design properties, ensuring consistency and flexibility across different platforms.

**Benefits:**

1. **Increased Efficiency:** With DLS, developers can quickly implement pre-built components, reducing the time and effort needed to develop new features.
2. **Consistency:** The unified design language ensures a consistent look and feel across all of Airbnb’s digital products, enhancing the user experience.
3. **Scalability:** DLS is designed to be scalable, allowing Airbnb to easily update and expand its design system as the company grows and evolves.

**Outcome:**
Since implementing DLS, Airbnb has seen significant improvements in both design and development efficiency. The design system has enabled better collaboration between designers and developers, reduced redundancy, and ensured a more cohesive and enjoyable user experience across all platforms.

**Read More:**

- [How AI helps UIUX designers work -Airbnb’s case study](https://axureboutique.medium.com/how-ai-helps-uiux-designers-work-airbnbs-case-study-da44671a4328)
- [Karri Saarinen: Airbnb Design Language System](https://karrisaarinen.com/dls/)

### Conclusion

Building your own design system can be a worthwhile investment, providing numerous benefits in terms of consistency, efficiency, and scalability. By following best practices and involving key stakeholders from the outset, you can create a robust design system that evolves with your needs. While the JavaScript framework you use might influence your approach, the fundamental principles of a design system remain universal. Ultimately, a well-crafted design system can significantly enhance the development process, making it an essential tool for modern web development.
