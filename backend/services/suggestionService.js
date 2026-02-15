const generateSuggestions = (text) => {
    const suggestions = [];

    if(!text || text.trim().length === 0){
        suggestions.push("The document appears empty. Please upload a valid file.");
        return suggestions;
    }

    const wordCount = text.split(/\s+/).length;
    const hasHashtag = text.includes("#");
    const hasCTA = 
    /comment|share|like|follow|subscribe|click/i.test(text);

    if(wordCount < 100){
        suggestions.push(
            "Consider adding more detailed content to improve engagement."
        );
    }

    if(!hasHashtag){
        suggestions.push(
            "Adding relevant hashtags can increase visibility and reach."
        );
    }

    if(!hasCTA){
        suggestions.push(
            "Include a call to action (e.g., 'Comment below' or 'Share your thoughts') to boost interaction."
        )
    };

    if(wordCount > 500){
        suggestions.push(
            "The content is quite long. Consider breaking it into shorter paragraphs for better readability."
        );
    }

    if(suggestions.length === 0){
        suggestions.push(
            "Your content looks well structured and engaging!"
        );
    }

    return suggestions;
};

module.exports = { generateSuggestions };