import * as motion from "motion/react-client"

export default function ScrollTriggered() {
    return (
        <div style={container}>
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    style={box}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                    variants={scaleVariants}
                    custom={i} // <- passes index to variants
                />
            ))}
        </div>
    )
}

// Accept `custom` as input to define delay per box
const scaleVariants = {
    hidden: {
        scale: 0,
        opacity: 0,
    },
    visible: (i) => ({
        scale: 1,
        opacity: 1,
        transition: {
            delay: i * 0.06,
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.5,
        },
    }),
}

const container = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBlock: "5rem",
    flexWrap: "wrap",
    gap: "20px",
}

const box = {
    width: 400,
    height: 500,
    backgroundColor: "#eee",
}