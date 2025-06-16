from django import forms
from .models import Product, ProductImage, Marketplace

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['title', 'description', 'specifications', 'marketplaces']

    images = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}), required=False)


class ProductImageForm(forms.ModelForm):
    class Meta:
        model = ProductImage
        fields = ['image', 'caption']
