from django.db import models
from django.utils.text import slugify
from django.urls import reverse
from taggit.managers import TaggableManager

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100,null=False,blank=False)

    def __str__(self):
        return self.name

class Photo(models.Model):
    description = models.TextField(max_length=500,null=False)
    category = models.ForeignKey(Category,on_delete=models.SET_NULL,null=True)
    image = models.ImageField(null=False,blank=False)
    tags = TaggableManager()

    def __str__(self):
        return self.description
