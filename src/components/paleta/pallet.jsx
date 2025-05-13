    import React from 'react';
    import { Box, Typography, Paper, Grid, Tooltip, IconButton } from '@mui/material';
    import ContentCopyIcon from '@mui/icons-material/ContentCopy';

    const ColorPalette = () => {
    // Definición de la paleta de colores
    const colorPalette = [
        { id: 'color1', hex: '#002e45', name: 'Azul Marino Profundo' },
        { id: 'color2', hex: '#004c66', name: 'Azul Océano' },
        { id: 'color3', hex: '#00768f', name: 'Azul Petróleo' },
        { id: 'color4', hex: '#00aebe', name: 'Turquesa' },
        { id: 'color5', hex: '#00f5ef', name: 'Turquesa Brillante' }
    ];

    // Función para copiar el código hex al portapapeles
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
            Paleta de Colores
        </Typography>

        <Grid container spacing={2}>
            {colorPalette.map((color) => (
            <Grid item xs={12} sm={6} md={4} key={color.id}>
                <Paper 
                elevation={2} 
                sx={{ 
                    overflow: 'hidden',
                    borderRadius: 2,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                    transform: 'translateY(-5px)'
                    }
                }}
                >
                <Box 
                    sx={{ 
                    height: 100, 
                    bgcolor: color.hex,
                    }}
                />
                <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        {color.name}
                    </Typography>
                    <Tooltip title="Copiar código hexadecimal">
                        <IconButton 
                        size="small" 
                        onClick={() => copyToClipboard(color.hex)}
                        aria-label="Copiar código de color"
                        >
                        <ContentCopyIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {color.hex}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    .{color.id} {'{color: ' + color.hex + ';}'}
                    </Typography>
                </Box>
                </Paper>
            </Grid>
            ))}
        </Grid>

        {/* Sección para uso de la paleta */}
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
            Cómo usar esta paleta
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Para usar estos colores en tus clases CSS, puedes copiar el siguiente código:
            </Typography>
            <Paper 
            elevation={1} 
            sx={{ 
                p: 2, 
                mt: 2, 
                bgcolor: '#f5f5f5',
                fontFamily: 'monospace',
                position: 'relative'
            }}
            >
            <pre style={{ margin: 0, overflowX: 'auto' }}>
    {`.color1 {color: #002e45;}
    .color2 {color: #004c66;}
    .color3 {color: #00768f;}
    .color4 {color: #00aebe;}
    .color5 {color: #00f5ef;}`}
            </pre>
            <Tooltip title="Copiar todo">
                <IconButton 
                size="small" 
                onClick={() => copyToClipboard(`.color1 {color: #002e45;}\n.color2 {color: #004c66;}\n.color3 {color: #00768f;}\n.color4 {color: #00aebe;}\n.color5 {color: #00f5ef;}`)}
                sx={{ position: 'absolute', top: 8, right: 8 }}
                aria-label="Copiar todo el código"
                >
                <ContentCopyIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            </Paper>
        </Box>
        </Paper>
    );
    };

    export default ColorPalette;