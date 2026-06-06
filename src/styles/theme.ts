export const theme = {
  colors: {
    primary: '#1B5E20', // Verde Escuro profundo
    primaryLight: '#4C8C4A',
    primaryDark: '#003300',
    secondary: '#F39C12', // Laranja quente
    background: '#F4F6F4', // Cinza levemente esverdeado
    surface: '#FFFFFF',
    error: '#E53935',
    text: '#1F2937', // Quase preto
    textSecondary: '#6B7280', // Cinza médio
    border: '#E5E7EB',
    cardShadow: 'rgba(0, 0, 0, 0.05)',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
    xxlarge: 48,
  },
  borderRadius: {
    small: 8,
    medium: 12,
    large: 20,
    round: 9999,
  },
  typography: {
    header: {
      fontSize: 28,
      fontWeight: '800' as const,
      color: '#1F2937',
      letterSpacing: -0.5,
    },
    title: {
      fontSize: 20,
      fontWeight: '700' as const,
      color: '#1F2937',
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: '#4B5563',
    },
    body: {
      fontSize: 15,
      color: '#6B7280',
      lineHeight: 22,
    },
    caption: {
      fontSize: 12,
      color: '#9CA3AF',
    }
  },
  shadows: {
    soft: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 4,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 6,
    }
  }
};
