import React from 'react';

// Recordatorio: Importa la fuente Montserrat en tu CSS global o index.html
// @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');

const COLORS = {
  textBlue: '#0b3d91',
  symbolGreen: '#2e8b57',
  outlineWhite: '#FFFFFF', // Color blanco para el contorno
};

const Logo = ({ size = '2.5rem' }) => {

  const styles = {
    logoContainer: {
      position: 'relative',
      display: 'inline-block',
      fontFamily: 'Montserrat, Arial, sans-serif',
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: size,
      color: COLORS.textBlue,
      textAlign: 'center',
      paddingLeft: '', // Podría necesitar un ligero ajuste con el stroke
      outline: '1px solid red',
    },
    text: {
      display: 'inline-block',
      verticalAlign: 'baseline',
      color: COLORS.textBlue,
    },
    plusSign: {
      position: 'absolute',
      left: 13.7,
      top: -0.2, // Podría necesitar un ligero ajuste con el stroke
      fontWeight: 'bold',
      lineHeight: 1,
      color: COLORS.symbolGreen, // Este es el color de RELLENO del '+'
      fontSize: '0.9em',

      // --- ¡Aquí la magia! ---
      // Propiedad para el contorno del texto/carácter
      // Define el grosor y el color del borde del carácter
      WebkitTextStrokeWidth: '1.6px', // Grosor del borde (ajusta según necesites)
      WebkitTextStrokeColor: COLORS.outlineWhite, // Color del borde

      // Nota: En CSS es '-webkit-text-stroke: 1.5px white;'
      // En objetos de estilo JS, se usan las propiedades individuales en camelCase.
      // Alternativamente, algunos navegadores podrían aceptar:
      // WebkitTextStroke: `1.5px ${COLORS.outlineWhite}`,

      // --- Alternativa estándar (menos nítida) usando text-shadow ---
      // textShadow: `
      //   -1px -1px 0 ${COLORS.outlineWhite},
      //    1px -1px 0 ${COLORS.outlineWhite},
      //   -1px  1px 0 ${COLORS.outlineWhite},
      //    1px  1px 0 ${COLORS.outlineWhite}
      // `,
    },
  };

  return (
    <div style={styles.logoContainer}>
      <span style={styles.plusSign}>
        +
      </span>
      <span style={styles.text}>
        EsterilMed
      </span>
    </div>
  );
};

export default Logo;