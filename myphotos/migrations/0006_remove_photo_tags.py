# Generated by Django 3.2.5 on 2021-12-20 02:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myphotos', '0005_photo_tags'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photo',
            name='tags',
        ),
    ]
