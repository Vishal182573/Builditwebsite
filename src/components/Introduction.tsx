import { motion } from 'framer-motion';

const Introduction = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 rounded-lg p-4"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          className="text-5xl font-bold mb-6"
        >
          Welcome to BuildIt
        </motion.h1>
        
        <motion.p
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl mb-8 max-w-2xl"
        >
          Your one-stop platform for property blogging, design inspiration, and custom interior solutions.
        </motion.p>
        
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-4">Featured Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Property Blogging', 'Design Gallery', 'Custom Requirements'].map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className="bg-white bg-opacity-20 p-6 rounded-lg"
              >
                <h3 className="text-xl font-semibold mb-2">{service}</h3>
                <p className="text-sm opacity-80">
                  Discover our range of services tailored to meet your property and design needs.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Introduction;