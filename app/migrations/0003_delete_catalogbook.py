# Generated by Django 4.2 on 2023-04-13 12:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_author_book_catalogbook_genre_delete_library'),
    ]

    operations = [
        migrations.DeleteModel(
            name='CatalogBook',
        ),
    ]
